// React DOM과 완전히 분리된 모달 방식 비디오 패치
(function() {
    console.log('🎬 Modal Video Patch 로드됨');
    
    let videoModal = null;
    
    // 전체 화면 모달로 비디오 표시
    function showVideoModal(cutVideoData) {
        console.log('🎥 비디오 모달 표시:', cutVideoData);
        
        // 기존 모달이 있으면 제거
        if (videoModal) {
            videoModal.remove();
        }
        
        // 모달 컨테이너 생성
        videoModal = document.createElement('div');
        videoModal.id = 'video-modal';
        videoModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;
        
        // 모달 내용 컨테이너
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            position: relative;
            width: 90%;
            max-width: 800px;
            background: black;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        `;
        
        // 비디오 요소
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.muted = false; // 모달에서는 음소거 해제
        video.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
        `;
        video.src = cutVideoData.video_url;
        
        // 헤더 (제목과 닫기 버튼)
        const header = document.createElement('div');
        header.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 10;
        `;
        
        const title = document.createElement('div');
        title.style.cssText = `
            color: white;
            font-size: 16px;
            font-weight: 600;
        `;
        title.textContent = `📹 ${cutVideoData.filename || 'cut_video.mp4'}`;
        
        const closeBtn = document.createElement('button');
        closeBtn.style.cssText = `
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
        `;
        closeBtn.innerHTML = '❌ 닫기';
        closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(239, 68, 68, 1)';
        closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(239, 68, 68, 0.9)';
        closeBtn.onclick = closeModal;
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // 하단 정보 패널
        const footer = document.createElement('div');
        footer.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            padding: 15px 20px;
            z-index: 10;
        `;
        
        const info = document.createElement('div');
        info.style.cssText = `
            color: white;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const timeInfo = document.createElement('div');
        timeInfo.innerHTML = `
            ⏰ ${cutVideoData.start_time || '00:00:00'} ~ ${cutVideoData.end_time || '00:00:00'}<br>
            📏 길이: ${cutVideoData.duration || '00:00:00'}
        `;
        
        const downloadBtn = document.createElement('a');
        downloadBtn.href = cutVideoData.video_url;
        downloadBtn.target = '_blank';
        downloadBtn.style.cssText = `
            background: rgba(59, 130, 246, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
        `;
        downloadBtn.innerHTML = '📥 다운로드';
        downloadBtn.onmouseover = () => downloadBtn.style.background = 'rgba(59, 130, 246, 1)';
        downloadBtn.onmouseout = () => downloadBtn.style.background = 'rgba(59, 130, 246, 0.9)';
        
        info.appendChild(timeInfo);
        info.appendChild(downloadBtn);
        footer.appendChild(info);
        
        // 비디오 이벤트 리스너
        video.onloadstart = () => console.log('🔄 모달 비디오 로드 시작');
        video.onloadeddata = () => console.log('✅ 모달 비디오 데이터 로드 완료');
        video.oncanplay = () => console.log('▶️ 모달 비디오 재생 준비 완료');
        video.onplay = () => console.log('🎬 모달 비디오 재생 시작');
        video.onerror = (e) => {
            console.error('❌ 모달 비디오 로드 실패:', e);
            showErrorMessage(modalContent, cutVideoData.video_url);
        };
        
        // 요소들 조립
        modalContent.appendChild(video);
        modalContent.appendChild(header);
        modalContent.appendChild(footer);
        videoModal.appendChild(modalContent);
        
        // 모달 외부 클릭 시 닫기
        videoModal.onclick = (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        };
        
        // ESC 키로 닫기
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // body에 모달 추가
        document.body.appendChild(videoModal);
        
        console.log('✅ 비디오 모달 표시 완료');
        
        // 비디오 포커스
        setTimeout(() => {
            video.focus();
        }, 100);
    }
    
    // 모달 닫기
    function closeModal() {
        if (videoModal) {
            videoModal.remove();
            videoModal = null;
            console.log('🗑️ 비디오 모달 닫음');
        }
    }
    
    // 에러 메시지 표시
    function showErrorMessage(container, videoUrl) {
        container.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 60px 40px;
                color: white;
                text-align: center;
                min-height: 300px;
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                <div style="font-size: 20px; margin-bottom: 10px; font-weight: 600;">비디오 로드 실패</div>
                <div style="font-size: 16px; margin-bottom: 30px; color: #94a3b8;">
                    비디오를 재생할 수 없습니다.<br>
                    직접 다운로드해서 확인해주세요.
                </div>
                <div style="display: flex; gap: 15px;">
                    <a href="${videoUrl}" target="_blank" style="
                        background: #3b82f6;
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 500;
                    ">📥 다운로드</a>
                    <button onclick="document.getElementById('video-modal').remove()" style="
                        background: #6b7280;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 500;
                    ">닫기</button>
                </div>
            </div>
        `;
    }
    
    // API 응답 감지
    function interceptFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = function(...args) {
            return originalFetch.apply(this, args)
                .then(response => {
                    if (args[0] && args[0].includes('/api/v1/lambda_function')) {
                        response.clone().json().then(data => {
                            console.log('🔍 API 응답 감지');
                            
                            if (data.success && data.has_video_result && data.cut_video) {
                                console.log('🎬 자른 영상 데이터 발견!');
                                
                                // React 렌더링과 충돌하지 않도록 충분한 지연
                                setTimeout(() => {
                                    showVideoModal(data.cut_video);
                                }, 1500);
                            }
                        }).catch(e => {
                            console.log('API 응답 파싱 실패:', e);
                        });
                    }
                    return response;
                })
                .catch(error => {
                    console.error('Fetch 오류:', error);
                    throw error;
                });
        };
    }
    
    // 초기화
    function initialize() {
        console.log('🚀 Modal Video Patch 초기화');
        interceptFetch();
        console.log('✅ Modal Video Patch 초기화 완료');
    }
    
    // DOM 로드 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
