import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ExternalLink, BookOpen, Target, CheckCircle2, Calendar, Award, GraduationCap, ClipboardList, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'
import { practiceQuestions as initialPracticeQuestions, type PracticeQuestion } from '@/data/practiceQuestions'

interface ChecklistItem {
  id: string
  title: string
  category: 'theory' | 'practice' | 'resource'
  completed: boolean
}

interface CurriculumItem {
  id: string
  title: string
  url: string
  completed: boolean
}

interface CurriculumSubject {
  id: string
  mainTopic: string
  items: CurriculumItem[]
}

interface CurriculumCategory {
  subject: string
  topics: CurriculumSubject[]
}

function App() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', title: '데이터 아키텍처 전문가 가이드 1회독', category: 'theory', completed: false },
    { id: '2', title: '데이터 아키텍처 전문가 가이드 2회독', category: 'theory', completed: false },
    { id: '3', title: '데이터 아키텍처 전문가 가이드 3회독', category: 'theory', completed: false },
    { id: '4', title: '실전문제집 1회 풀이 완료', category: 'practice', completed: false },
    { id: '5', title: '실전문제집 2회 풀이 완료', category: 'practice', completed: false },
    { id: '6', title: '실전문제집 오답 노트 작성', category: 'practice', completed: false },
    { id: '7', title: 'ERD 수기 모델링 연습 (주 3회 이상)', category: 'practice', completed: false },
    { id: '8', title: '엔티티 도출 연습 10회 이상', category: 'practice', completed: false },
    { id: '9', title: '식별/비식별 관계 설정 연습', category: 'practice', completed: false },
    { id: '10', title: 'DataQ 회원가입 및 시험 일정 확인', category: 'resource', completed: false },
    { id: '11', title: '데이터 전문가 포럼 가입', category: 'resource', completed: false },
    { id: '12', title: 'Data On Air 복원 문제 검토', category: 'resource', completed: false },
  ])

  const [curriculum, setCurriculum] = useState<CurriculumCategory[]>([
    {
      subject: '전사아키텍처 이해',
      topics: [
        {
          id: 'ea-overview',
          mainTopic: '전사아키텍처 개요',
          items: [
            { id: 'ea-1', title: '전사아키텍처 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36442', completed: false },
            { id: 'ea-2', title: '전사아키텍처 프레임워크', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36443', completed: false },
            { id: 'ea-3', title: '전사아키텍처 참조 모델', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36444', completed: false },
            { id: 'ea-4', title: '전사아키텍처 프로세스', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36445', completed: false },
          ]
        },
        {
          id: 'ea-build',
          mainTopic: '전사아키텍처 구축',
          items: [
            { id: 'ea-5', title: '전사아키텍처 방향 수립', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36447', completed: false },
            { id: 'ea-6', title: '전사아키텍처 정보 구성 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36448', completed: false },
            { id: 'ea-7', title: '전사아키텍처 정보 구축', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36449', completed: false },
          ]
        },
        {
          id: 'ea-manage',
          mainTopic: '전사아키텍처 관리 및 활용',
          items: [
            { id: 'ea-8', title: '전사아키텍처 관리 체계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36450', completed: false },
            { id: 'ea-9', title: '전사아키텍처 관리 시스템', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36452', completed: false },
            { id: 'ea-10', title: '전사아키텍처 활용', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36451', completed: false },
          ]
        }
      ]
    },
    {
      subject: '데이터 요건 분석',
      topics: [
        {
          id: 'req-overview',
          mainTopic: '정보 요구 사항 개요',
          items: [
            { id: 'req-1', title: '정보 요구 사항', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36453', completed: false },
            { id: 'req-2', title: '정보 요구 사항 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36454', completed: false },
          ]
        },
        {
          id: 'req-survey',
          mainTopic: '정보 요구 사항 조사',
          items: [
            { id: 'req-3', title: '정보 요구 사항 수집', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36455', completed: false },
            { id: 'req-4', title: '정보 요구 사항 정리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36456', completed: false },
            { id: 'req-5', title: '정보 요구 사항 통합', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36457', completed: false },
          ]
        },
        {
          id: 'req-analysis',
          mainTopic: '정보 요구 사항 분석',
          items: [
            { id: 'req-6', title: '분석 대상 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36458', completed: false },
            { id: 'req-7', title: '정보 요구 사항 상세화', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36459', completed: false },
            { id: 'req-8', title: '정보 요구 사항 확인', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36460', completed: false },
          ]
        },
        {
          id: 'req-verify',
          mainTopic: '정보 요구 검증',
          items: [
            { id: 'req-9', title: '정보 요구 사항 상관분석 기법', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36461', completed: false },
            { id: 'req-10', title: '추가 및 삭제 정보 요구 사항 도출', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36462', completed: false },
            { id: 'req-11', title: '정보 요구 보완 및 확인', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36463', completed: false },
          ]
        }
      ]
    },
    {
      subject: '데이터 표준화',
      topics: [
        {
          id: 'std-overview',
          mainTopic: '데이터 표준화 개요',
          items: [
            { id: 'std-1', title: '데이터 표준화 필요성', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36464', completed: false },
            { id: 'std-2', title: '데이터 표준 개념', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36465', completed: false },
            { id: 'std-3', title: '데이터 표준 관리 도구', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36466', completed: false },
          ]
        },
        {
          id: 'std-establish',
          mainTopic: '데이터 표준 수립',
          items: [
            { id: 'std-4', title: '데이터 표준화 원칙 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36467', completed: false },
            { id: 'std-5', title: '데이터 표준 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36468', completed: false },
            { id: 'std-6', title: '데이터 표준 확정', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36469', completed: false },
          ]
        },
        {
          id: 'std-manage',
          mainTopic: '데이터 표준 관리',
          items: [
            { id: 'std-7', title: '데이터 표준 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36470', completed: false },
            { id: 'std-8', title: '데이터 표준 관리 프로세스', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36471', completed: false },
          ]
        }
      ]
    },
    {
      subject: '데이터 모델링',
      topics: [
        {
          id: 'mod-understand',
          mainTopic: '데이터 모델링 이해',
          items: [
            { id: 'mod-1', title: '데이터 모델링 개요', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36472', completed: false },
            { id: 'mod-2', title: '데이터 모델링 기법 이해', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36473', completed: false },
            { id: 'mod-3', title: '데이터 모델링 표기법 이해', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36474', completed: false },
          ]
        },
        {
          id: 'mod-concept',
          mainTopic: '개념 데이터 모델링',
          items: [
            { id: 'mod-4', title: '개념 데이터 모델링 이해', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36475', completed: false },
            { id: 'mod-5', title: '주제 영역 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36476', completed: false },
            { id: 'mod-6', title: '후보 엔티티 선정', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36477', completed: false },
            { id: 'mod-7', title: '핵심 엔티티 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36478', completed: false },
            { id: 'mod-8', title: '관계 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36479', completed: false },
            { id: 'mod-9', title: '개념 데이터 모델 작성', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36480', completed: false },
          ]
        },
        {
          id: 'mod-logical',
          mainTopic: '논리 데이터 모델링',
          items: [
            { id: 'mod-10', title: '논리 데이터 모델링 이해', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36481', completed: false },
            { id: 'mod-11', title: '속성 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36482', completed: false },
            { id: 'mod-12', title: '엔티티 상세화', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36483', completed: false },
            { id: 'mod-13', title: '이력관리 정의', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36484', completed: false },
            { id: 'mod-14', title: '논리 데이터 모델 품질 검토', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36485', completed: false },
          ]
        },
        {
          id: 'mod-physical',
          mainTopic: '물리 데이터 모델링',
          items: [
            { id: 'mod-15', title: '물리 데이터 모델링 이해', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36486', completed: false },
            { id: 'mod-16', title: '물리 요소 조사 및 분석', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36487', completed: false },
            { id: 'mod-17', title: '논리-물리 모델 변환', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36488', completed: false },
            { id: 'mod-18', title: '반정규화', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36489', completed: false },
            { id: 'mod-19', title: '물리 데이터 모델 품질 검토', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36490', completed: false },
          ]
        }
      ]
    },
    {
      subject: '데이터베이스 설계와 이용',
      topics: [
        {
          id: 'db-design',
          mainTopic: '데이터베이스 설계',
          items: [
            { id: 'db-1', title: '저장공간 설계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36491', completed: false },
            { id: 'db-2', title: '무결성 설계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36492', completed: false },
            { id: 'db-3', title: '인덱스 설계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36493', completed: false },
            { id: 'db-4', title: '분산 설계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36494', completed: false },
            { id: 'db-5', title: '보안 설계', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36495', completed: false },
          ]
        },
        {
          id: 'db-use',
          mainTopic: '데이터베이스 이용',
          items: [
            { id: 'db-6', title: '데이터베이스 관리 시스템(DBMS)', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36496', completed: false },
            { id: 'db-7', title: '데이터 액세스', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36497', completed: false },
            { id: 'db-8', title: '트랜잭션', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36498', completed: false },
            { id: 'db-9', title: '백업 및 복구', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36499', completed: false },
          ]
        },
        {
          id: 'db-performance',
          mainTopic: '데이터베이스 성능 개선',
          items: [
            { id: 'db-10', title: '성능 개선 방법론', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36500', completed: false },
            { id: 'db-11', title: '조인(Join)', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36501', completed: false },
            { id: 'db-12', title: '애플리케이션 성능 개선', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36502', completed: false },
            { id: 'db-13', title: '서버 성능 개선', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36503', completed: false },
          ]
        }
      ]
    },
    {
      subject: '데이터 품질관리 이해',
      topics: [
        {
          id: 'qual-data',
          mainTopic: '데이터 이해',
          items: [
            { id: 'qual-1', title: '데이터 품질 관리 프레임워크', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36504', completed: false },
            { id: 'qual-2', title: '표준 데이터', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36505', completed: false },
            { id: 'qual-3', title: '모델 데이터', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36506', completed: false },
            { id: 'qual-4', title: '관리 데이터', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36507', completed: false },
            { id: 'qual-5', title: '업무 데이터', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36508', completed: false },
          ]
        },
        {
          id: 'qual-structure',
          mainTopic: '데이터 구조 이해',
          items: [
            { id: 'qual-6', title: '개념 데이터 모델', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36509', completed: false },
            { id: 'qual-7', title: '데이터 참조 모델', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36510', completed: false },
            { id: 'qual-8', title: '논리 데이터 모델', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36511', completed: false },
            { id: 'qual-9', title: '물리 데이터 모델', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36512', completed: false },
            { id: 'qual-10', title: '데이터베이스', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36513', completed: false },
            { id: 'qual-11', title: '사용자 뷰', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36514', completed: false },
          ]
        },
        {
          id: 'qual-process',
          mainTopic: '데이터 관리 프로세스 이해',
          items: [
            { id: 'qual-12', title: '데이터 관리 정책', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36515', completed: false },
            { id: 'qual-13', title: '데이터 표준 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36516', completed: false },
            { id: 'qual-14', title: '요구 사항 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36517', completed: false },
            { id: 'qual-15', title: '데이터 모델 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36518', completed: false },
            { id: 'qual-16', title: '데이터 흐름 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36519', completed: false },
            { id: 'qual-17', title: '데이터베이스 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36520', completed: false },
            { id: 'qual-18', title: '데이터 활용 관리', url: 'https://www.kdata.or.kr/kr/board/dataonair_data/boardView.do?pageIndex=1&bbsIdx=36521', completed: false },
          ]
        }
      ]
    }
  ])

  const [questions, setQuestions] = useState<PracticeQuestion[]>(initialPracticeQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [showAnswer, setShowAnswer] = useState(false)

  const categories = ['전체', ...Array.from(new Set(questions.map(q => q.category)))]

  const filteredQuestions = selectedCategory === '전체'
    ? questions
    : questions.filter(q => q.category === selectedCategory)

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    )
  }

  const toggleCurriculumItem = (categoryIdx: number, topicIdx: number, itemIdx: number) => {
    setCurriculum(prev => {
      const newCurriculum = [...prev]
      newCurriculum[categoryIdx].topics[topicIdx].items[itemIdx].completed =
        !newCurriculum[categoryIdx].topics[topicIdx].items[itemIdx].completed
      return newCurriculum
    })
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setQuestions(prev =>
      prev.map(q => q.id === questionId ? { ...q, userAnswer: answerIndex } : q)
    )
    setShowAnswer(false)
  }

  const handleToggleMark = (questionId: number) => {
    setQuestions(prev =>
      prev.map(q => q.id === questionId ? { ...q, isMarked: !q.isMarked } : q)
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentQuestionIndex(0)
    setShowAnswer(false)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setShowAnswer(false)
    }
  }

  const handleCheckAnswer = () => {
    setShowAnswer(true)
  }

  const completedCount = checklist.filter(item => item.completed).length
  const progressPercentage = (completedCount / checklist.length) * 100

  const totalCurriculumItems = curriculum.reduce((total, category) =>
    total + category.topics.reduce((sum, topic) => sum + topic.items.length, 0), 0
  )

  const completedCurriculumItems = curriculum.reduce((total, category) =>
    total + category.topics.reduce((sum, topic) =>
      sum + topic.items.filter(item => item.completed).length, 0
    ), 0
  )

  const curriculumProgressPercentage = totalCurriculumItems > 0
    ? (completedCurriculumItems / totalCurriculumItems) * 100
    : 0

  const answeredQuestions = questions.filter(q => q.userAnswer !== null).length
  const markedQuestions = questions.filter(q => q.isMarked).length
  const correctAnsweredQuestions = questions.filter(q => q.userAnswer !== null && q.userAnswer === q.correctAnswer).length
  const questionProgressPercentage = questions.length > 0
    ? (answeredQuestions / questions.length) * 100
    : 0
  const accuracyPercentage = answeredQuestions > 0
    ? (correctAnsweredQuestions / answeredQuestions) * 100
    : 0

  const officialResources = [
    {
      title: 'DataQ (데이터자격시험)',
      url: 'https://www.dataq.or.kr',
      description: '공식 시험 접수 및 공지사항',
      tags: ['필수', '시험접수']
    },
    {
      title: 'Data On Air',
      url: 'https://dataonair.or.kr',
      description: '데이터 아키텍처 기술 아티클 및 가이드',
      tags: ['학습자료', '무료']
    },
    {
      title: '데이터 전문가 포럼',
      url: 'https://cafe.naver.com/sqlpd',
      description: '기출 복원 문제 및 수험생 커뮤니티',
      tags: ['커뮤니티', '복원문제']
    },
    {
      title: '한국데이터산업진흥원 교육자료',
      url: 'https://www.kdata.or.kr/kr/board/dataonair_data/list.do',
      description: '공식 커리큘럼별 학습 자료',
      tags: ['공식자료', '필수']
    }
  ]

  const books = [
    {
      title: '데이터 아키텍처 전문가 가이드',
      type: '이론서',
      description: '전사아키텍처, 데이터 모델링, DB 설계 등 전 범위 수록',
      importance: '필수'
    },
    {
      title: '데이터 아키텍처 자격검정 실전문제',
      type: '문제집',
      description: 'K-Data 공식 출판, 실제 시험 유형과 가장 유사',
      importance: '필수'
    }
  ]

  const strategies = [
    {
      exam: '필기 (객관식)',
      strategy: '데이터 아키텍처 전문가 가이드를 3회독 이상 정독하며, 실전문제집의 오답 노트를 철저히 작성',
      tips: ['문장 하나하나가 출제 대상', '공식 가이드 암기 수준으로 학습', '반복 학습이 핵심']
    },
    {
      exam: '실기 (모델링)',
      strategy: '시험 시간(4시간) 내에 수기(손)로 논리/물리 모델링을 완성하는 연습',
      tips: ['엔티티 도출 손 연습 필수', '식별/비식별 관계 설정 숙달', '매일 ERD 그리기 연습', '실기 시험이 당락 결정']
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">DAP 자격증 학습 관리</h1>
              <p className="text-sm text-slate-600">데이터 아키텍처 전문가 (Data Architecture Professional)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
            <TabsTrigger value="practice">연습문제</TabsTrigger>
            <TabsTrigger value="resources">공식 자료</TabsTrigger>
            <TabsTrigger value="strategy">학습 전략</TabsTrigger>
            <TabsTrigger value="progress">학습 진도</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  DAP 자격증이란?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-slate-700 leading-relaxed">
                    한국데이터산업진흥원(K-Data)에서 주관하는 <strong>DAP(데이터 아키텍처 전문가)</strong> 자격증은
                    합격률이 매우 낮고 난이도가 높은 최고 수준의 자격증입니다.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="text-blue-600 font-semibold mb-2">난이도</div>
                    <div className="text-2xl font-bold text-slate-900">최고 수준</div>
                    <div className="text-sm text-slate-600 mt-1">합격률 매우 낮음</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="text-green-600 font-semibold mb-2">시험 구성</div>
                    <div className="text-2xl font-bold text-slate-900">필기 + 실기</div>
                    <div className="text-sm text-slate-600 mt-1">객관식 + 수기 모델링</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="text-orange-600 font-semibold mb-2">핵심 포인트</div>
                    <div className="text-2xl font-bold text-slate-900">공식 가이드</div>
                    <div className="text-sm text-slate-600 mt-1">완벽 숙지 필수</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <p className="text-sm font-semibold text-amber-900 mb-1">핵심 학습 전략</p>
                  <p className="text-sm text-amber-800">
                    '공식 가이드'를 완벽하게 숙지하는 것이 가장 중요합니다.
                    공식 가이드북의 문장 하나하나가 시험에 출제된다고 생각하고 학습해야 합니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>시험 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                    <span className="font-semibold text-slate-700">주관 기관</span>
                    <span className="text-slate-900">한국데이터산업진흥원 (K-Data)</span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                    <span className="font-semibold text-slate-700">필기 시험</span>
                    <span className="text-slate-900">객관식 (데이터 아키텍처 이론)</span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                    <span className="font-semibold text-slate-700">실기 시험</span>
                    <span className="text-slate-900">수기 모델링 (4시간, 손으로 ERD 작성)</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-700">합격 결정 요인</span>
                    <span className="text-slate-900 font-semibold text-red-600">실기 시험이 당락 결정</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  공식 커리큘럼
                </CardTitle>
                <CardDescription>
                  한국데이터산업진흥원 공식 교육자료 기반 학습 커리큘럼
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">커리큘럼 진도율</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {completedCurriculumItems} / {totalCurriculumItems} 완료
                    </span>
                  </div>
                  <Progress value={curriculumProgressPercentage} className="h-3" />
                  <p className="text-xs text-slate-500 mt-1">{curriculumProgressPercentage.toFixed(0)}% 완료</p>
                </div>

                <div className="space-y-4">
                  {curriculum.map((category, categoryIdx) => (
                    <Card key={categoryIdx} className="border-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{category.subject}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="multiple" className="w-full">
                          {category.topics.map((topic, topicIdx) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                                <div className="flex items-center gap-2">
                                  <span>{topic.mainTopic}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {topic.items.filter(item => item.completed).length}/{topic.items.length}
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2 pt-2">
                                  {topic.items.map((item, itemIdx) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center gap-3 p-2 border border-slate-200 rounded hover:bg-slate-50"
                                    >
                                      <Checkbox
                                        id={item.id}
                                        checked={item.completed}
                                        onCheckedChange={() => toggleCurriculumItem(categoryIdx, topicIdx, itemIdx)}
                                      />
                                      <label
                                        htmlFor={item.id}
                                        className={`flex-1 text-sm cursor-pointer ${
                                          item.completed ? 'line-through text-slate-400' : 'text-slate-700'
                                        }`}
                                      >
                                        {item.title}
                                      </label>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.open(item.url, '_blank')}
                                        className="h-7"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-slate-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">커리큘럼 학습 가이드</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">각 항목은 공식 교육자료 링크와 연결되어 있습니다</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">체크박스로 학습 진도를 관리하세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">순서대로 학습하는 것을 권장하지만, 필요에 따라 조정 가능합니다</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">각 자료를 최소 2-3회 반복 학습하세요</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Questions Tab */}
          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  연습문제
                </CardTitle>
                <CardDescription>
                  DAP 자격증 대비 연습문제로 학습하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-700">진도율</span>
                      <Badge variant="secondary">
                        {answeredQuestions} / {questions.length} 문제 풀이 완료
                      </Badge>
                      {answeredQuestions > 0 && (
                        <Badge className="bg-green-600">
                          정답률: {accuracyPercentage.toFixed(0)}% ({correctAnsweredQuestions}/{answeredQuestions})
                        </Badge>
                      )}
                      {markedQuestions > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Bookmark className="w-3 h-3" />
                          {markedQuestions} 표시됨
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={questionProgressPercentage} className="h-3" />
                  <p className="text-xs text-slate-500 mt-1">{questionProgressPercentage.toFixed(0)}% 완료</p>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">카테고리 선택</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                        {category !== '전체' && (
                          <Badge variant="secondary" className="ml-2">
                            {questions.filter(q => q.category === category).length}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Question Display */}
                {currentQuestion ? (
                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge>{currentQuestion.category}</Badge>
                          <span className="text-sm text-slate-600">
                            문제 {currentQuestionIndex + 1} / {filteredQuestions.length}
                          </span>
                        </div>
                        <Button
                          variant={currentQuestion.isMarked ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleToggleMark(currentQuestion.id)}
                        >
                          <Bookmark className="w-4 h-4 mr-1" />
                          {currentQuestion.isMarked ? '표시됨' : '표시하기'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-slate-900 leading-relaxed whitespace-pre-wrap">
                          {currentQuestion.question}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">답안 선택</h4>
                        <RadioGroup
                          value={currentQuestion.userAnswer?.toString() ?? ''}
                          onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                          disabled={showAnswer}
                        >
                          <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                              const isCorrect = index === currentQuestion.correctAnswer
                              const isUserAnswer = currentQuestion.userAnswer === index
                              const isWrongAnswer = showAnswer && isUserAnswer && !isCorrect

                              let borderColor = 'border-slate-200'
                              let bgColor = 'bg-white'

                              if (showAnswer) {
                                if (isCorrect) {
                                  borderColor = 'border-green-500'
                                  bgColor = 'bg-green-50'
                                } else if (isWrongAnswer) {
                                  borderColor = 'border-red-500'
                                  bgColor = 'bg-red-50'
                                }
                              } else if (isUserAnswer) {
                                borderColor = 'border-blue-500'
                                bgColor = 'bg-blue-50'
                              }

                              return (
                                <div
                                  key={index}
                                  className={`flex items-start gap-3 p-4 border-2 rounded-lg transition-colors ${borderColor} ${bgColor} ${
                                    !showAnswer && !isUserAnswer ? 'cursor-pointer hover:border-slate-300 hover:bg-slate-50' : ''
                                  }`}
                                >
                                  <RadioGroupItem value={index.toString()} id={`q${currentQuestion.id}-opt${index}`} />
                                  <Label
                                    htmlFor={`q${currentQuestion.id}-opt${index}`}
                                    className={`flex-1 cursor-pointer text-slate-700 leading-relaxed ${showAnswer && !isUserAnswer ? 'cursor-default' : ''}`}
                                  >
                                    <span className={`font-semibold mr-2 ${
                                      showAnswer && isCorrect ? 'text-green-600' :
                                      isWrongAnswer ? 'text-red-600' :
                                      'text-blue-600'
                                    }`}>
                                      {index + 1}.
                                    </span>
                                    {option}
                                    {showAnswer && isCorrect && (
                                      <Badge className="ml-2 bg-green-600">정답</Badge>
                                    )}
                                    {isWrongAnswer && (
                                      <Badge className="ml-2 bg-red-600">오답</Badge>
                                    )}
                                  </Label>
                                </div>
                              )
                            })}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Answer Check Button */}
                      {currentQuestion.userAnswer !== null && !showAnswer && (
                        <div className="flex justify-center">
                          <Button
                            onClick={handleCheckAnswer}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            정답 확인
                          </Button>
                        </div>
                      )}

                      {/* Answer Explanation */}
                      {showAnswer && (
                        <div className={`p-4 rounded-lg border-2 ${
                          currentQuestion.userAnswer === currentQuestion.correctAnswer
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            {currentQuestion.userAnswer === currentQuestion.correctAnswer ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-green-900">정답입니다!</span>
                              </>
                            ) : (
                              <>
                                <span className="font-semibold text-red-900">오답입니다.</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-slate-700">
                            정답: <span className="font-semibold">{currentQuestion.correctAnswer + 1}번</span>
                          </p>
                          <p className="text-xs text-slate-600 mt-2">
                            💡 이 문제는 잘못된 설명을 찾는 문제입니다. 정답 선택지가 가장 부적절하거나 틀린 내용입니다.
                          </p>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <Button
                          variant="outline"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          이전 문제
                        </Button>
                        <span className="text-sm text-slate-600">
                          {currentQuestionIndex + 1} / {filteredQuestions.length}
                        </span>
                        <Button
                          variant="outline"
                          onClick={handleNextQuestion}
                          disabled={currentQuestionIndex === filteredQuestions.length - 1}
                        >
                          다음 문제
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-8">
                      <p className="text-center text-slate-600">
                        선택한 카테고리에 문제가 없습니다.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-slate-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">연습문제 학습 가이드</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">카테고리별로 문제를 풀면서 약점을 파악하세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">어려운 문제는 '표시하기'로 나중에 다시 풀어보세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">모든 문제를 최소 2-3회 이상 반복해서 풀어보세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">오답은 공식 가이드를 참고하여 정확히 이해하세요</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>공식 웹사이트 및 커뮤니티</CardTitle>
                <CardDescription>필수 자료와 정보를 얻을 수 있는 공식 채널</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {officialResources.map((resource, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-slate-900">{resource.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        방문
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
                    <div className="flex gap-2">
                      {resource.tags.map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-slate-500 font-mono">{resource.url}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>필수 공식 교재</CardTitle>
                <CardDescription>K-Data 감수 공식 가이드북 (교보문고, 예스24 등에서 구매 가능)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {books.map((book, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start gap-3 mb-2">
                      <Badge className="mt-1">{book.type}</Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{book.title}</h3>
                        <p className="text-sm text-slate-600">{book.description}</p>
                      </div>
                      <Badge variant="destructive">{book.importance}</Badge>
                    </div>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-sm font-semibold text-red-900 mb-1">중요 안내</p>
                  <p className="text-sm text-red-800">
                    K-Data는 원칙적으로 기출문제를 공식 공개하지 않습니다.
                    따라서 '공식 연습문제'는 위 실전문제집이 유일합니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>추가 학습 자료</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-slate-900 mb-1">수험생 커뮤니티 활용</h4>
                  <p className="text-sm text-slate-600">
                    응시자들이 시험 직후 기억을 되살려 문제를 복원하고 토론하는 커뮤니티 가입이 필수적입니다.
                    'DAP 복원' 또는 '실기 후기'를 검색하여 출제 경향을 파악하세요.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-semibold text-slate-900 mb-1">Data On Air 활용</h4>
                  <p className="text-sm text-slate-600">
                    과거 dbguide.net으로 불리던 사이트로, 데이터 아키텍처 관련 기술 아티클과
                    가이드라인이 무료로 제공됩니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  DAP 학습 전략
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {strategies.map((strategy, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-5 bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{strategy.exam}</h3>
                      {idx === 1 && <Badge variant="destructive">당락 결정</Badge>}
                    </div>
                    <p className="text-slate-700 mb-4 bg-slate-50 p-3 rounded border-l-4 border-blue-500">
                      {strategy.strategy}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-700">핵심 포인트:</p>
                      <ul className="space-y-1">
                        {strategy.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="text-sm text-slate-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>학습 우선순위</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">공식 커리큘럼 학습</h4>
                      <p className="text-sm text-slate-600">커리큘럼 탭의 모든 공식 자료를 순서대로 학습</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">공식 가이드 정독</h4>
                      <p className="text-sm text-slate-600">데이터 아키텍처 전문가 가이드 3회독 필수</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">실전문제 풀이</h4>
                      <p className="text-sm text-slate-600">공식 실전문제집 반복 풀이 및 오답 노트 작성</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">수기 모델링 연습</h4>
                      <p className="text-sm text-slate-600">매일 손으로 ERD를 그리는 연습 (실기 합격의 핵심)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">커뮤니티 활용</h4>
                      <p className="text-sm text-slate-600">복원 문제 검토 및 수험생 정보 교류</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  학습 진도 관리
                </CardTitle>
                <CardDescription>
                  체크리스트를 활용하여 학습 진행 상황을 관리하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">전체 진도율</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {completedCount} / {checklist.length} 완료
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-xs text-slate-500 mt-1">{progressPercentage.toFixed(0)}% 완료</p>
                </div>

                <div className="space-y-6">
                  {/* Theory Section */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Badge>이론 학습</Badge>
                    </h3>
                    <div className="space-y-2">
                      {checklist.filter(item => item.category === 'theory').map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => toggleChecklistItem(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className={`flex-1 cursor-pointer ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
                          >
                            {item.title}
                          </label>
                          {item.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practice Section */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Badge variant="secondary">실습 연습</Badge>
                    </h3>
                    <div className="space-y-2">
                      {checklist.filter(item => item.category === 'practice').map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => toggleChecklistItem(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className={`flex-1 cursor-pointer ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
                          >
                            {item.title}
                          </label>
                          {item.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Badge variant="outline">자료 확보</Badge>
                    </h3>
                    <div className="space-y-2">
                      {checklist.filter(item => item.category === 'resource').map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => toggleChecklistItem(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className={`flex-1 cursor-pointer ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
                          >
                            {item.title}
                          </label>
                          {item.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">학습 팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">매일 일정 시간을 정해 규칙적으로 학습하세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">실기 시험은 손으로 직접 그려야 하므로 컴퓨터 툴보다 종이에 연습하세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">커뮤니티에서 다른 수험생들과 정보를 공유하며 학습하세요</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">공식 가이드의 모든 문장이 시험 문제가 될 수 있다는 마음가짐으로 학습하세요</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-600">
          <p>DAP 자격증 학습을 응원합니다! 꾸준한 학습으로 반드시 합격하세요.</p>
          <p className="mt-2 text-xs text-slate-500">
            본 사이트는 학습 관리를 위한 참고 자료이며, 공식 정보는 DataQ를 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
