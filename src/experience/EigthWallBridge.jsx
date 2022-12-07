import { useThree, useFrame, createPortal } from '@react-three/fiber'
import { useEffect, memo } from 'react'
import * as THREE from 'three'

export default memo(function EightwallBridge({ children }) {
  const gl = useThree((state) => state.gl)
  const set = useThree((state) => state.set)
  const camera = useThree((state) => state.camera)

  const initScenePipelineModule = () => {
    const setupScene = ({ camera, renderer }) => {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      camera.position.set(0, 2, 3)
    }
    // Return a camera pipeline module that adds scene elements on start.
    return {
      // Camera pipeline modules need a name. It can be whatever you want but must be unique within
      // your app.
      name: 'threejsinitscene',
      // onStart is called once when the camera feed begins. In this case, we need to wait for the
      // XR8.Threejs scene to be ready before we can access it to add content. It was created in
      // XR8.Threejs.pipelineModule()'s onStart method.
      onStart: ({ canvas }) => {
        const { camera, renderer } = XR8.Threejs.xrScene()

        setupScene({ camera, renderer })

        // prevent scroll/pinch gestures on canvas
        canvas.addEventListener('touchmove', (event) => {
          event.preventDefault()
        })
        // Sync the xr controller's 6DoF position and camera paremeters with our scene.
        XR8.XrController.updateCameraProjectionMatrix({
          origin: camera.position,
          facing: camera.quaternion,
        })
        // Recenter content when the canvas is tapped.
        canvas.addEventListener(
          'touchstart',
          (e) => {
            e.touches.length === 1 && XR8.XrController.recenter()
          },
          true
        )

        camera.userData.ready = true
        set({ camera })

        console.log('✨', 'AR Ready')
      },
    }
  }

  useEffect(() => {
    const onxrloaded = () => {
      const canvas = gl.domElement

      window.THREE = THREE

      XR8.addCameraPipelineModules([
        // Add camera pipeline modules.
        // Existing pipeline modules.
        XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
        XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
        XR8.XrController.pipelineModule(), // Enables SLAM tracking.

        XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
        XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
        XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.

        // Custom pipeline modules.
        initScenePipelineModule(), // Sets up the threejs camera and scene content.
      ])

      // Open the camera and start running the camera run loop.
      XR8.run({ canvas })
    }

    if (window.XR8) {
      onxrloaded()
    } else {
      window.addEventListener('xrloaded', onxrloaded)
    }
  }, [])

  useFrame(() => null, 1) // switch off rendering, let 8thwall take care of it

  if (!camera?.userData.ready) return null

  return createPortal(children, XR8.Threejs.xrScene().scene)
})
