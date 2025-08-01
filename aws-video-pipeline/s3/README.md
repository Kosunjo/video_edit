# S3 버킷 생성 가이드

## 📦 생성할 버킷

1. **입력 버킷**: `video-input-pipeline-20250724`
2. **출력 버킷**: `video-output-pipeline-20250724`

## 🔧 AWS 콘솔에서 생성 방법

### 1. AWS S3 콘솔 접속
- AWS 콘솔 → S3 서비스 선택

### 2. 입력 버킷 생성
1. **"버킷 만들기"** 클릭
2. **버킷 이름**: `video-input-pipeline-20250724`
3. **AWS 리전**: `아시아 태평양(서울) ap-northeast-2`
4. **객체 소유권**: ACL 비활성화됨 (권장)
5. **퍼블릭 액세스 차단**: 모든 퍼블릭 액세스 차단 (기본값)
6. **버킷 버전 관리**: 비활성화
7. **기본 암호화**: Amazon S3 관리형 키(SSE-S3)
8. **"버킷 만들기"** 클릭

### 3. 출력 버킷 생성
1. **"버킷 만들기"** 클릭
2. **버킷 이름**: `video-output-pipeline-20250724`
3. **AWS 리전**: `아시아 태평양(서울) ap-northeast-2`
4. **객체 소유권**: ACL 비활성화됨 (권장)
5. **퍼블릭 액세스 차단**: 모든 퍼블릭 액세스 차단 (기본값)
6. **버킷 버전 관리**: 비활성화
7. **기본 암호화**: Amazon S3 관리형 키(SSE-S3)
8. **"버킷 만들기"** 클릭

### 4. 입력 버킷에 EventBridge 알림 설정

1. **입력 버킷** (`video-input-pipeline-20250724`) 선택
2. **속성** 탭 클릭
3. **이벤트 알림** 섹션에서 **"Amazon EventBridge"** 활성화
4. **변경 사항 저장**

### 5. 출력 버킷에 EventBridge 알림 설정

1. **출력 버킷** (`video-output-pipeline-20250724`) 선택
2. **속성** 탭 클릭
3. **이벤트 알림** 섹션에서 **"Amazon EventBridge"** 활성화
4. **변경 사항 저장**

## ✅ 확인 사항

- [ ] 입력 버킷 생성 완료
- [ ] 출력 버킷 생성 완료
- [ ] 두 버킷 모두 EventBridge 알림 활성화
- [ ] 리전이 ap-northeast-2로 설정됨

## 📝 참고사항

- 버킷 이름은 전 세계적으로 고유해야 합니다
- 날짜 접미사를 현재 날짜로 변경하여 사용하세요
- EventBridge 알림 설정은 필수입니다 (Lambda 트리거용)
