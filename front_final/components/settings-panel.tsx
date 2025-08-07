"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SettingsPanelProps {
  selectedVideo: string | null
  selectedCount: string | null
  selectedType: string
  onVideoSelect: (video: string) => void
  onCountSelect: (count: string) => void
  onTypeSelect: (type: string) => void
}

const TYPE_OPTIONS = [
  { name: "highlights", icon: "🎯" },
  { name: "shorts", icon: "📱" },
]

export function SettingsPanel({
  selectedVideo,
  selectedCount,
  selectedType,
  onVideoSelect,
  onCountSelect,
  onTypeSelect,
}: SettingsPanelProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [countInput, setCountInput] = useState("")
  const [videoOptions, setVideoOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // S3에서 비디오 목록 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true)
        console.log("S3에서 비디오 옵션을 가져오는 중...")
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://43.200.6.54:5000"}/api/v1/bucketdata`)
        
        console.log("API 응답:", response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log("받은 데이터:", data)
          
          // 비디오 파일만 필터링
          const videoExtensions = [".mp4", ".avi", ".mov", ".webm", ".mkv", ".flv", ".wmv"]
          const videoFiles = data.filter((item: string) => 
            videoExtensions.some(ext => item.toLowerCase().endsWith(ext))
          )
          
          console.log("필터링된 비디오 파일들:", videoFiles)
          setVideoOptions(videoFiles)
        } else {
          console.log("API 오류:", response.status)
          setVideoOptions(["business-meeting.mp4", "design-workshop.mp4", "marketing-presentation.mp4", "tutorial-basics.mp4", "product-demo.mp4"])
        }
      } catch (error) {
        console.error("비디오 옵션 로딩 오류:", error)
        setVideoOptions(["business-meeting.mp4", "design-workshop.mp4", "marketing-presentation.mp4", "tutorial-basics.mp4", "product-demo.mp4"])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchVideos()
  }, [])

  const toggleAccordion = (item: string) => {
    setExpandedAccordion(expandedAccordion === item ? null : item)
  }

  const handleCountSubmit = () => {
    if (countInput.trim()) {
      onCountSelect(countInput)
      setExpandedAccordion(null)
      setCountInput("")
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Settings</h2>

      <div className="flex gap-3">
        {/* Video Input */}
        <div className="flex-1 relative">
          <Button
            variant="secondary"
            className="w-full justify-between bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-200 hover:border-purple-500/30"
            onClick={() => toggleAccordion("Video Input")}
          >
            <span className="flex items-center gap-2">
              Video Input
              {selectedVideo && (
                <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded border border-purple-500/30">
                  📹 {selectedVideo.replace(".mp4", "")}
                </span>
              )}
            </span>
            {expandedAccordion === "Video Input" ? (
              <ChevronDown className="h-4 w-4 text-purple-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </Button>

          {expandedAccordion === "Video Input" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl max-h-40 overflow-y-auto border border-gray-700/50 z-50">
              {isLoading ? (
                <div className="px-4 py-3 text-sm text-gray-400">
                  비디오 목록을 로딩 중...
                </div>
              ) : videoOptions.length > 0 ? (
                videoOptions.map((video: string, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-700/60 cursor-pointer border-b border-gray-700/30 last:border-b-0 text-sm text-gray-200 transition-colors duration-150 hover:text-purple-400"
                    onClick={() => {
                      onVideoSelect(video)
                      setExpandedAccordion(null)
                    }}
                  >
                    📹 {video}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400">
                  비디오 파일이 없습니다
                </div>
              )}
            </div>
          )}
        </div>

        {/* Count */}
        <div className="flex-1 relative">
          <Button
            variant="secondary"
            className="w-full justify-between bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-200 hover:border-purple-500/30"
            onClick={() => toggleAccordion("Count")}
          >
            <span className="flex items-center gap-2">
              Count
              {selectedCount && (
                <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded border border-purple-500/30">
                  {selectedCount} videos
                </span>
              )}
            </span>
            {expandedAccordion === "Count" ? (
              <ChevronDown className="h-4 w-4 text-purple-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </Button>

          {expandedAccordion === "Count" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 border border-gray-700/50 z-50">
              <Input
                type="number"
                value={countInput}
                onChange={(e) => setCountInput(e.target.value)}
                placeholder="Enter count..."
                className="w-full bg-gray-700/60 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                min="1"
              />
              <Button
                className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-sm shadow-lg transition-all duration-200 shadow-purple-500/25"
                onClick={handleCountSubmit}
              >
                Set Count
              </Button>
            </div>
          )}
        </div>

        {/* Type */}
        <div className="flex-1 relative">
          <Button
            variant="secondary"
            className="w-full justify-between bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-200 hover:border-purple-500/30"
            onClick={() => toggleAccordion("Type")}
          >
            <span className="flex items-center gap-2">
              Type
              {selectedType && (
                <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded border border-purple-500/30">
                  {TYPE_OPTIONS.find((t) => t.name === selectedType)?.icon} {selectedType}
                </span>
              )}
            </span>
            {expandedAccordion === "Type" ? (
              <ChevronDown className="h-4 w-4 text-purple-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </Button>

          {expandedAccordion === "Type" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 z-50">
              {TYPE_OPTIONS.map((type, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-700/60 cursor-pointer border-b border-gray-700/30 last:border-b-0 text-gray-200 transition-colors duration-150 hover:text-purple-400"
                  onClick={() => {
                    onTypeSelect(type.name)
                    setExpandedAccordion(null)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize font-medium">{type.name}</span>
                    <span className="text-xs text-purple-400">{type.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
