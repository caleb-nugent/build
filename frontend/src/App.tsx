import { useState } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  useToast,
  Container,
  Image,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState<string>('')
  const toast = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post('http://localhost:8000/analyze-furniture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setPlans(response.data.plans)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze the furniture. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Heading>Furniture Vision</Heading>
          <Box>
            Upload your furniture image to get started
          </Box>
          
          <Box w="full" maxW="md" p={6} borderWidth={1} borderRadius="lg">
            <VStack spacing={4}>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                p={1}
              />
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  maxH="300px"
                  objectFit="contain"
                />
              )}
              <Button
                colorScheme="blue"
                onClick={handleUpload}
                isDisabled={!selectedFile || loading}
                w="full"
              >
                {loading ? <Spinner /> : 'Analyze Furniture'}
              </Button>
            </VStack>
          </Box>

          {plans && (
            <Box w="full" p={6} borderWidth={1} borderRadius="lg">
              <VStack align="start" spacing={4}>
                <Heading size="md">Woodworking Plans</Heading>
                <Text whiteSpace="pre-wrap">{plans}</Text>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App 