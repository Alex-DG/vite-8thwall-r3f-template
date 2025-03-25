import { useThree, useFrame, createPortal } from '@react-three/fiber'
import { useEffect, memo, useCallback, useState } from 'react'
import * as THREE from 'three'

// Separate component for AR content
const ARContent = memo(({ children }) => {
  const { scene, camera } = window.XR8.Threejs.xrScene()
  const set = useThree((state) => state.set)

  useEffect(() => {
    if (camera) {
      set({ camera })
    }
  }, [camera, set])

  return createPortal(children, scene)
})

// Main bridge component
const EightWallBridge = memo(({ children }) => {
  const gl = useThree((state) => state.gl)
  const [xr8Ready, setXr8Ready] = useState(false)

  const setupScene = useCallback(({ camera, renderer }) => {
    // Enhanced shadow configuration
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    // Safe performance optimizations
    renderer.info.autoReset = false
    renderer.powerPreference = 'high-performance'

    // Camera setup
    camera.near = 0.1
    camera.far = 100
    camera.updateProjectionMatrix()
    camera.position.set(0, 3, 3)
  }, [])

  const initScenePipelineModule = useCallback(() => {
    return {
      name: 'threejsinitscene',
      onStart: ({ canvas }) => {
        const { camera, renderer } = window.XR8.Threejs.xrScene()
        setupScene({ camera, renderer })

        // Touch event handlers
        const handleTouchMove = (event) => event.preventDefault()
        const handleTouchStart = (e) => {
          if (e.touches.length === 1) {
            window.XR8.XrController.recenter()
          }
        }

        // Add event listeners
        canvas.addEventListener('touchmove', handleTouchMove, {
          passive: false,
        })
        canvas.addEventListener('touchstart', handleTouchStart, {
          passive: true,
        })

        // Sync camera parameters
        window.XR8.XrController.updateCameraProjectionMatrix({
          origin: camera.position,
          facing: camera.quaternion,
        })

        camera.userData.ready = true
        setXr8Ready(true)

        return () => {
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchstart', handleTouchStart)
        }
      },
    }
  }, [setupScene])

  useEffect(() => {
    const initXR = () => {
      if (!window.XR8) return

      const canvas = gl.domElement
      window.THREE = THREE

      // Pipeline modules configuration
      const pipelineModules = [
        window.XR8.GlTextureRenderer.pipelineModule(),
        window.XR8.Threejs.pipelineModule(),
        window.XR8.XrController.pipelineModule(),
        window.XRExtras.FullWindowCanvas.pipelineModule(),
        window.XRExtras.Loading.pipelineModule(),
        window.XRExtras.RuntimeError.pipelineModule(),
        initScenePipelineModule(),
      ]

      window.XR8.addCameraPipelineModules(pipelineModules)

      // Start XR with optimized configuration
      window.XR8.run({
        canvas,
        disableWorldTracking: false,
        allowedDevices: window.XR8.XrConfig.device().ANY,
      })
    }

    // Wait for XR8 to be available
    if (window.XR8) {
      initXR()
    } else {
      window.addEventListener('xrloaded', initXR)
    }

    return () => {
      window.removeEventListener('xrloaded', initXR)
      if (window.XR8) {
        window.XR8.stop()
      }
    }
  }, [gl.domElement, initScenePipelineModule])

  // Disable R3F rendering loop since 8th Wall handles it
  useFrame(() => null, 1)

  if (!xr8Ready) return null

  return <ARContent>{children}</ARContent>
})

export default EightWallBridge
