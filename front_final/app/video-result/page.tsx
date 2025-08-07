"use client"

import { useState, useEffect } from "react"
import { SettingsPanel } from "@/components/settings-panel"
import { VideoPlayer } from "@/components/video-player"
import { PromptSection } from "@/components/prompt-section"
import { ChatBot } from "@/components/chat-bot"

import type { Video, ChatMessage } from "@/types/video-finder"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, text: "안녕하세요! 오늘 어떤 비디오를 찾아드릴까요?", isBot: true },
  { id: 2, text: "샘플 비디오를 찾고 있어요", isBot: false },
  { id: 3, text: "네, 도와드릴게요! 어떤 종류의 비디오를 원하시나요?", isBot: true },
]

export default function VideoResultPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedCount, setSelectedCount] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>("highlights")
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES)
  const [prompt, setPrompt] = useState("")
  const [editedVideos, setEditedVideos] = useState<Video[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // AI 에이전트가 편집한 결과를 표시할 샘플 데이터
  const SAMPLE_EDITED_VIDEOS: Video[] = [
    {
      id: 1,
      title: "Business Meeting",
      url: "/placeholder.svg?height=120&width=200&text=Business+Meeting",
      duration: "5:32",
    },
    {
      id: 2,
      title: "Design Workshop",
      url: "/placeholder.svg?height=120&width=200&text=Design+Workshop",
      duration: "8:15",
    },
    {
      id: 3,
      title: "Marketing Presentation",
      url: "/placeholder.svg?height=120&width=200&text=Marketing+Presentation",
      duration: "12:45",
    },
  ]

  const handlePromptSubmit = async () => {
    console.log("handlePromptSubmit 호출됨!")
    console.log("현재 prompt:", prompt)
    console.log("현재 selectedVideo:", selectedVideo)
    
    if (!prompt.trim()) {
      console.log("프롬프트가 비어있음")
      return
    }
    if (!selectedVideo) {
      console.log("비디오가 선택되지 않음")
      return
    }

    console.log("처리 시작 - isProcessing을 true로 설정")
    setIsProcessing(true)
    
    try {
      console.log("백엔드로 전송하는 데이터:", {
        selectedVideo,
        selectedCount: selectedCount || "5",
        selectedType,
        prompt
      })

      const params = new URLSearchParams({
        selectedVideo,
        selectedCount: selectedCount || "5",
        selectedType,
        prompt
      })

      const response = await fetch(`http://43.200.6.54:5002/api/v1/video_ai?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log("백엔드 응답:", data)
        
        // AI가 편집한 비디오들로 설정
        if (data.editedVideos) {
          setEditedVideos(data.editedVideos)
        } else {
          // 응답에 editedVideos가 없으면 샘플 데이터 사용
          setEditedVideos(SAMPLE_EDITED_VIDEOS)
        }
        
        setPrompt("")
      } else {
        const errorData = await response.json()
        console.error("백엔드 오류:", errorData)
      }
    } catch (error) {
      console.error("전송 오류:", error)
    } finally {
      console.log("처리 완료 - isProcessing을 false로 설정")
      setIsProcessing(false)
    }
  }

  const handleChatSubmit = (message: string) => {
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: message,
      isBot: false,
    }
    setChatMessages((prev) => [...prev, newMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: chatMessages.length + 2,
        text: "요청사항을 이해했습니다. 적합한 비디오를 찾아드리겠습니다.",
        isBot: true,
      }
      setChatMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const navigateVideo = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : editedVideos.length - 1))
    } else {
      setCurrentVideoIndex((prev) => (prev < editedVideos.length - 1 ? prev + 1 : 0))
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Window Header */}
        <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm rounded-t-lg px-6 py-3 flex items-center justify-between border border-gray-800/50">
          {/* Left - Logo */}
          <Link href="/" className="text-xl font-bold text-white tracking-tight hover:text-gray-300 transition-colors">
            Video Finder
          </Link>
          
          {/* Center - Navigation Menu */}
          <nav className="flex items-center space-x-8 text-gray-300 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Storage
            </Link>
            <Link href="/video-result" className="hover:text-white transition-colors duration-200">
              Video Result
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Text
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Video
            </Link>
          </nav>
          
          {/* Right - Login Button */}
          <Button
            variant="outline"
            className="bg-transparent text-white border border-gray-600 hover:bg-gray-700/50 hover:border-gray-500 transition-colors duration-200 px-6 py-2 rounded-lg"
          >
            Login
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-b-lg p-6 flex gap-6 border-x border-b border-gray-800/50">
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            <SettingsPanel
              selectedVideo={selectedVideo}
              selectedCount={selectedCount}
              selectedType={selectedType}
              onVideoSelect={setSelectedVideo}
              onCountSelect={setSelectedCount}
              onTypeSelect={setSelectedType}
            />

            <VideoPlayer
              videos={editedVideos}
              currentVideoIndex={currentVideoIndex}
              selectedType={selectedType}
              onNavigate={navigateVideo}
              onVideoSelect={setCurrentVideoIndex}
            />

            <PromptSection prompt={prompt} onPromptChange={setPrompt} onSubmit={handlePromptSubmit} />
          </div>

          {/* Right Panel - Chat Bot */}
          <div className="w-80">
            <ChatBot messages={chatMessages} onMessageSubmit={handleChatSubmit} />
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-20 bg-black rounded-lg overflow-hidden border-2 border-gray-600">
                <div className="absolute top-0 left-0 w-full h-full flex transition-transform duration-200">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="w-1/8 h-full flex-shrink-0 border-r border-gray-600">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-80"></div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-1 left-1 right-1 flex justify-between">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  ))}
                </div>
                <div className="absolute bottom-1 left-1 right-1 flex justify-between">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                영상을 편집 중입니다...
              </h3>
              <div className="flex justify-center space-x-1 mb-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-400" : "bg-gray-400"} animate-pulse`}></div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                잠시만 기다려주세요...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
