import { useThree, useFrame, createPortal } from '@react-three/fiber'
import { useEffect, memo, useCallback } from 'react'
import * as THREE from 'three'

export default memo(function EightwallBridge({ children }) {
  const gl = useThree((state) => state.gl)
  const set = useThree((state) => state.set)
  const camera = useThree((state) => state.camera)

  const setupScene = useCallback(({ camera, renderer }) => {
    // Enhanced shadow configuration
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    // Safe performance optimizations
    renderer.info.autoReset = false // Disable auto stats reset
    renderer.powerPreference = 'high-performance' // Hint to use discrete GPU if available

    // Ensure proper shadow camera setup
    camera.near = 0.1
    camera.far = 100
    camera.updateProjectionMatrix()

    camera.position.set(0, 3, 3)
  }, [])

  const initScenePipelineModule = useCallback(() => {
    return {
      name: 'threejsinitscene',
      onStart: ({ canvas }) => {
        const { camera, renderer } = XR8.Threejs.xrScene()

        setupScene({ camera, renderer })

        // Touch event handlers with cleanup
        const handleTouchMove = (event) => event.preventDefault()
        const handleTouchStart = (e) => {
          if (e.touches.length === 1) {
            XR8.XrController.recenter()
          }
        }

        // Add event listeners with passive option where possible
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true })

        // Sync the xr controller's 6DoF position and camera parameters with our scene.
        XR8.XrController.updateCameraProjectionMatrix({
          origin: camera.position,
          facing: camera.quaternion,
        })

        camera.userData.ready = true
        set({ camera })

        // Cleanup function for the pipeline module
        return () => {
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchstart', handleTouchStart)
        }
      },
    }
  }, [setupScene, set])

  useEffect(() => {
    const onxrloaded = () => {
      const canvas = gl.domElement
      window.THREE = THREE

      // Pipeline modules configuration
      const pipelineModules = [
        XR8.GlTextureRenderer.pipelineModule(),
        XR8.Threejs.pipelineModule(),
        XR8.XrController.pipelineModule(),
        XRExtras.FullWindowCanvas.pipelineModule(),
        XRExtras.Loading.pipelineModule(),
        XRExtras.RuntimeError.pipelineModule(),
        initScenePipelineModule(),
      ]

      XR8.addCameraPipelineModules(pipelineModules)

      // Start XR with optimized configuration
      XR8.run({
        canvas,
        // Only use performance-safe options
        disableWorldTracking: false,
        allowedDevices: XR8.XrConfig.device().ANY,
      })
    }

    if (window.XR8) {
      onxrloaded()
    } else {
      window.addEventListener('xrloaded', onxrloaded)
    }

    // Cleanup
    return () => {
      window.removeEventListener('xrloaded', onxrloaded)
      if (window.XR8) {
        XR8.stop()
      }
    }
  }, [gl.domElement, initScenePipelineModule])

  // Disable R3F rendering loop since 8th Wall handles it
  useFrame(() => null, 1)

  if (!camera?.userData.ready) return null

  return createPortal(children, XR8.Threejs.xrScene().scene)
})
