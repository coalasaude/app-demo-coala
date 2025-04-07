import { Typography } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useEffect, useRef, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

import useMediaQuery from '@/hooks/useMediaQuery'

import { CBasicAvatar } from '../CAvatar'

import {
  CameraButton,
  CloseButton,
  ImageContainer,
  InputHidden,
  Option,
  OptionsContainer,
  StyledDialog,
  Video,
  WebcamContainer,
} from './styles'

type ImageModalProps = {
  open?: boolean
  onClose: () => void
  variant?: 'user' | 'organization'

  onCapture?: (file: File) => void
  onUpload?: (file: File) => void
  onRemove?: () => void

  url?: string
}

export const CImageModal = ({ open, onClose, url, variant, ...props }: ImageModalProps) => {
  const [isActiveWebCam, setIsActiveWebCam] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const isMobile = useMediaQuery('sm')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      if (props.onCapture) props.onCapture(file)
      if (props.onUpload) props.onUpload(file)

      setIsActiveWebCam(false)
    }
  }

  const handleTakePhotoClick = () => {
    if (cameraInputRef?.current) cameraInputRef.current.click()
  }

  const handleChoosePhotoClick = () => {
    if (fileInputRef?.current) fileInputRef?.current.click()
  }

  useEffect(() => {
    const getVideoStream = async () => {
      if (isActiveWebCam && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          videoRef.current.srcObject = stream
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Erro ao acessar a câmera do dispositivo:', error)
        }
      }
    }

    getVideoStream()
    const currentVideoRef = videoRef.current
    return () => {
      if (currentVideoRef?.srcObject) {
        const tracks = (currentVideoRef.srcObject as MediaStream).getTracks()
        tracks.forEach((track: MediaStreamTrack) => track.stop())
      }
    }
  }, [isActiveWebCam])

  const takePhoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    if (canvas && video) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      context?.drawImage(video, 0, 0)

      const imageDataUrl = canvas.toDataURL('image/png')

      fetch(imageDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'photo.png', { type: 'image/png' })
          props.onCapture && props.onCapture(file)
          setIsActiveWebCam(false)
        })
    }
  }

  const handleClose = () => {
    onClose()
    setIsActiveWebCam(false)
  }

  const handleRemove = () => {
    setIsActiveWebCam(false)
    props.onRemove && props.onRemove()
  }

  return (
    <StyledDialog
      open={!!open}
      onClose={handleClose}
      aria-labelledby='invalidate-attachments-dialog'
      aria-describedby='invalidate-attachments-dialog'
    >
      <InputHidden
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />

      <InputHidden
        type='file'
        accept='image/*'
        capture='environment'
        ref={cameraInputRef}
        onChange={handleFileInputChange}
      />

      <CloseButton onClick={handleClose} />

      {isActiveWebCam ? (
        <WebcamContainer>
          <Video ref={videoRef} autoPlay playsInline />

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <CameraButton>
            <CameraAltIcon sx={{ fontSize: '30px', color: 'white' }} onClick={takePhoto} />
          </CameraButton>
        </WebcamContainer>
      ) : (
        <>
          <ImageContainer>
            <CBasicAvatar src={url} variant={variant} height='164px' width='164px' />
          </ImageContainer>

          <OptionsContainer>
            {props.onCapture && (
              <Option onClick={isMobile ? handleTakePhotoClick : () => setIsActiveWebCam(true)}>
                <CameraAltIcon />
                <Typography variant='body1'>Tirar Foto</Typography>
              </Option>
            )}

            {props.onUpload && (
              <Option onClick={handleChoosePhotoClick}>
                <AddPhotoAlternateIcon />
                <Typography variant='body1'>Escolher foto</Typography>
              </Option>
            )}

            {props.onRemove && (
              <Option onClick={handleRemove}>
                <RemoveCircleIcon />
                <Typography variant='body1'>Remover foto atual</Typography>
              </Option>
            )}
          </OptionsContainer>
        </>
      )}
    </StyledDialog>
  )
}
