import { Avatar, Box, Dialog, Typography } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CloseIcon from '@mui/icons-material/Close'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

import { CDivider } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import useMediaQuery from '@/hooks/useMediaQuery'
import { FullWidthAvatar } from '@/v3/presentation/components/AvatarInfo/styles'
import { useMutateAddUserImage } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddUserImage'
import { useMutateDeleteUserImage } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateDeleteUserImage'
interface IModal {
  open?: boolean
  onClose: () => void
  id?: number
  onSuccess?: () => void
  url?: string
}

const schema = yup.object({
  file: yup.mixed<File[]>().when('removed', {
    is: (removed: string) => !removed,
    then: (schema) =>
      schema.required().test('fileSize', 'É necessário selecionar um arquivo', (value) => {
        return value.length > 0
      }),
  }),
})

const initialValues = {
  file: [] as File[],
  removed: false,
}

export const ImageDialog = ({ open, id, onClose, onSuccess, url }: IModal) => {
  const [isActiveWebCam, setIsActiveWebCam] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { mutateAsync: deletePictureProfileMutate } = useMutateDeleteUserImage()
  const { mutateAsync: createPictureProfileMutate } = useMutateAddUserImage()
  const isMobile = useMediaQuery('sm')
  const { handleSubmit, control, formState, reset, setValue, watch, ...others } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const file = watch('file')

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setValue('file', [file])
    }
  }

  const handleTakePhotoClick = () => {
    if (cameraInputRef?.current) cameraInputRef.current.click()
  }

  const handleChoosePhotoClick = () => {
    if (fileInputRef?.current) fileInputRef?.current.click()
  }

  const onRemoveImage = useCallback(async () => {
    if (id) {
      await deletePictureProfileMutate({ userId: id })
      onSuccess?.()
    }
  }, [deletePictureProfileMutate, id, onSuccess])

  const onSubmit = useCallback(
    (body: any) => {
      const values = {
        file: body.file[0],
        dependent_id: Number(id),
      }
      if (body.removed) {
        reset({
          file: [],
          removed: false,
        } as any)
        onRemoveImage()
        onClose()
        return
      }
      if (values) {
        createPictureProfileMutate({ userId: values.dependent_id, image: values.file })
        onSuccess?.()
        setValue('file', [])
        onClose()
      }
    },
    [createPictureProfileMutate, id, onClose, onRemoveImage, onSuccess, reset, setValue],
  )

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

  useEffect(() => {
    if (file?.length && file.length > 0) {
      onSubmit({ file })
    }
  }, [file, onSubmit])

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
          setValue('file', [file])
          setIsActiveWebCam(false)
        })
    }
  }

  return (
    <Box>
      <Dialog
        open={!!open}
        onClose={() => {
          onClose()
          setIsActiveWebCam(false)
        }}
        aria-labelledby='invalidate-attachments-dialog'
        aria-describedby='invalidate-attachments-dialog'
        sx={{
          ...(isMobile && {
            '.MuiDialog-container': {
              alignItems: 'flex-end',
            },
            '.MuiPaper-root': {
              width: '100%',
              margin: 0,
            },
          }),
        }}
      >
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />

        <input
          type='file'
          accept='image/*'
          capture='environment'
          style={{ display: 'none' }}
          ref={cameraInputRef}
          onChange={handleFileInputChange}
        />
        <Box
          position='absolute'
          sx={{ top: '25px', right: '25px', cursor: 'pointer' }}
          onClick={() => {
            onClose()
            setIsActiveWebCam(false)
          }}
        >
          <CloseIcon />
        </Box>
        {isActiveWebCam ? (
          <Box margin={9} position='relative'>
            <Box width='444px' height='308px' borderRadius={3}>
              <video ref={videoRef} autoPlay playsInline width='100%' height='100%' />
            </Box>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Box
              position='absolute'
              left={0}
              right={0}
              bottom={0}
              margin='auto'
              width='55px'
              height='55px'
            >
              <Box
                sx={{
                  width: '55px',
                  height: '55px',
                  backgroundColor: 'var(--mui-palette-primary-main)',
                  position: 'relative',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <CameraAltIcon sx={{ fontSize: '30px', color: 'white' }} onClick={takePhoto} />
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              width={isMobile ? '100%' : '428px'}
              paddingTop={5}
              paddingBottom={3}
              paddingX={4}
            >
              <Avatar sx={{ width: '164px', height: '164px' }} alt='Avatar photo' src={url}>
                <FullWidthAvatar
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </Avatar>
            </Box>
            <CForm
              form={{ handleSubmit, control, formState, reset, setValue, watch, ...others }}
              onSubmit={onSubmit}
            >
              <Box
                display='flex'
                flexDirection='column'
                alignItems='flex-start'
                justifyContent='center'
                padding='10px'
                width='100%'
                gap='8px'
                paddingLeft={4}
                paddingRight={7}
                paddingBottom={2}
              >
                <Box width='100%'>
                  <Box
                    display='flex'
                    gap='10px'
                    py='10px'
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    onClick={isMobile ? handleTakePhotoClick : () => setIsActiveWebCam(true)}
                  >
                    <CameraAltIcon sx={{ color: 'var(--mui-palette-grey-500)' }} />
                    <Typography variant='body1' color='var(--mui-palette-grey-600)'>
                      Tirar Foto
                    </Typography>
                  </Box>
                  <CDivider sx={{ marginTop: '4px' }} />
                </Box>
                <Box width='100%'>
                  <Box
                    display='flex'
                    gap='10px'
                    py='10px'
                    color='var(--mui-palette-grey-600)'
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    onClick={handleChoosePhotoClick}
                  >
                    <AddPhotoAlternateIcon sx={{ color: 'var(--mui-palette-grey-500)' }} />
                    <Typography variant='body1' color='var(--mui-palette-grey-600)'>
                      Escolher foto
                    </Typography>
                  </Box>
                  <CDivider sx={{ marginTop: '4px' }} />
                </Box>
                <Box width='100%'>
                  <Box
                    display='flex'
                    gap='10px'
                    py='10px'
                    color='var(--mui-palette-grey-600)'
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    onClick={() => {
                      onRemoveImage()
                      onClose()
                    }}
                  >
                    <RemoveCircleIcon sx={{ color: 'var(--mui-palette-grey-500)' }} />
                    <Typography color='var(--mui-palette-grey-600)' variant='body1'>
                      Remover foto atual
                    </Typography>
                  </Box>
                  <CDivider sx={{ marginTop: '4px' }} />
                </Box>
              </Box>
            </CForm>
          </>
        )}
      </Dialog>
    </Box>
  )
}
