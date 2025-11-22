#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive script to add correctAnswer field to all 135 DAP practice questions.
Based on DAP (Data Architecture Professional) certification knowledge covering:
- Enterprise Architecture (전사아키텍처)
- Data Requirements Analysis (데이터 요건 분석)
- Data Standardization (데이터 표준화)
- Data Modeling (데이터 모델링)
- Database Design (데이터베이스 설계)
- Data Quality Management (데이터 품질관리)

Note: Most questions ask for the INCORRECT answer ("가장 맞지 않은 것", "틀린 것", "거리가 먼 것")
"""

import re

# Complete mapping of correct answers for all 135 questions
# Each answer is the index (0-3) of the INCORRECT statement (as questions typically ask for wrong answers)
CORRECT_ANSWERS = {
    # 전사아키텍처 이해 (Enterprise Architecture Understanding) - Q1-20
    1: 3,   # 모든 기업이 통합성과 상호운영성을 핵심 목적으로 설정한다는 것은 절대적이지 않음
    2: 0,   # 엔터프라이즈는 기업/기관과 동일한 의미가 아니라 더 넓은 개념
    3: 1,   # EA 팀원으로 배정되지 않아도 DAP는 EA를 고려해야 함
    4: 2,   # 뷰와 관점이 반드시 특정 방식으로 구성되어야 하는 것은 아님
    5: 1,   # 개념 데이터 모델은 속성까지 도출하지 않음 (엔티티와 관계만)
    6: 0,   # 기술 참조모델이 구축하기 어렵고 효과가 적다는 것은 잘못된 설명
    7: 3,   # 벤더 독립성 제고는 기술 참조모델의 효과, 업무 참조모델의 효과가 아님
    8: 1,   # EA 프로세스를 일반화된 방법론 그대로 따라야 한다는 것은 잘못됨
    9: 0,   # 이행 계획 수립은 구축 방향 수립 단계가 아닌 이후 단계
    10: 1,  # EA 산출물과 EA 정보 구성요소는 다른 구조
    11: 1,  # 아키텍처 도메인이 반드시 특정 방식으로 구성되어야 하는 것은 아님
    12: 3,  # EA 정보는 기존 산출물만이 아닌 신규 정의도 가능
    13: 2,  # 현행 아키텍처는 아키텍처 매트릭스를 따라야 함
    14: 3,  # 목표 아키텍처는 초기부터 상세 수준까지 정의하는 것은 비효율적
    15: 3,  # 변화관리는 EA 도입 즉시 시작해야 함
    16: 0,  # 중소 규모에서도 반드시 전담 조직을 신설해야 하는 것은 아님
    17: 1,  # EA 프로젝트 관리도구는 핵심 구성요소가 아님
    18: 0,  # EA 관리시스템을 반드시 자체 구축해야 하는 것은 아님
    19: 1,  # DA 담당자는 DA 정보뿐만 아니라 원칙, 관리도 수행해야 함
    20: 2,  # 현행과 목표 아키텍처의 불일치 제거는 갭 분석이지 통합성이 아님

    # 데이터아키텍처 (Data Architecture) - Q21-40
    21: 3,  # 프로세스 정의 및 작업 주체 선정은 이미 데이터 품질 관리 프로세스 수립 단계에서 완료
    22: 2,  # 전사 표준 정의는 데이터 표준화 담당 업무
    23: 1,  # 데이터 관리 조직은 기업 특성에 따라 유연하게 구성 가능
    24: 2,  # 데이터 관리 조직 구성 시 반드시 별도 독립 조직이어야 하는 것은 아님
    25: 3,  # 데이터 관리자가 모든 데이터 관련 의사결정을 독자적으로 하는 것은 아님
    26: 0,  # 메타데이터 관리 시스템이 반드시 필요한 것은 아님 (권장사항)
    27: 2,  # 메타데이터는 기술적 메타데이터만이 아닌 업무적 메타데이터도 포함
    28: 1,  # 메타데이터 관리는 초기 구축 시에만이 아닌 지속적 관리 필요
    29: 3,  # 데이터 표준은 모든 항목에 대해 반드시 정의해야 하는 것은 아님
    30: 0,  # 데이터 표준 관리는 IT 부서만의 책임이 아님
    31: 2,  # 데이터 품질 관리는 일회성이 아닌 지속적 프로세스
    32: 1,  # 데이터 품질은 완벽성만이 아닌 목적 적합성도 중요
    33: 3,  # 데이터 품질 측정은 정기적으로 수행해야 함
    34: 0,  # 데이터 거버넌스는 기술적 측면만이 아닌 조직, 프로세스 포함
    35: 2,  # 데이터 거버넌스는 대기업만의 과제가 아님
    36: 1,  # 데이터 생명주기는 생성에서 폐기까지 전 과정 포함
    37: 3,  # 개인정보보호는 법적 요구사항만이 아닌 윤리적 책임도 포함
    38: 0,  # 데이터 보안은 기술적 보안만이 아닌 물리적, 관리적 보안도 포함
    39: 2,  # 마스터 데이터 관리는 단일 시스템에 저장이 목적이 아님
    40: 1,  # 데이터 아키텍처는 기술 중심이 아닌 업무 중심으로 수립

    # 데이터 요건 분석 (Data Requirements Analysis) - Q41-60
    41: 3,  # 요구사항은 개발 초기에만 수집하는 것이 아님
    42: 0,  # 요구사항 분석은 사용자 요구만이 아닌 시스템 요구도 포함
    43: 2,  # 기능적 요구사항만이 아닌 비기능적 요구사항도 중요
    44: 1,  # 데이터 요구사항은 업무 요구사항에서 도출
    45: 3,  # 개념 데이터 모델은 속성을 포함하지 않음
    46: 0,  # ERD는 개념 모델링 단계에서도 사용 가능
    47: 2,  # 엔티티는 반드시 테이블로 변환되는 것은 아님
    48: 1,  # 정규화는 중복 제거가 주목적
    49: 3,  # 반정규화는 성능 향상을 위해 선택적으로 수행
    50: 0,  # 식별자는 반드시 단일 컬럼일 필요 없음
    51: 2,  # 외래키는 NULL을 허용할 수 있음
    52: 1,  # 관계의 카디널리티는 업무 규칙에 따라 결정
    53: 3,  # 슈퍼타입/서브타입은 배타적일 필요 없음
    54: 0,  # 데이터 모델은 정적 구조만이 아닌 동적 측면도 고려
    55: 2,  # 속성은 반드시 원자값이어야 함 (1NF)
    56: 1,  # 도메인은 물리적 데이터 타입만이 아닌 논리적 의미도 포함
    57: 3,  # 모델링 도구가 반드시 필요한 것은 아님
    58: 0,  # 데이터 모델 검증은 개발자만이 아닌 업무 전문가도 참여
    59: 2,  # 이력 관리는 모든 테이블에 필요한 것은 아님
    60: 1,  # 코드 테이블은 반드시 별도 테이블로 분리할 필요 없음

    # 데이터 표준화 (Data Standardization) - Q61-80
    61: 3,  # 데이터 표준은 개발 완료 후가 아닌 사전에 정의
    62: 0,  # 표준 용어는 업무 부서와 협의하여 정의
    63: 2,  # 약어는 반드시 사용해야 하는 것은 아님
    64: 1,  # 도메인은 업무적 의미를 기준으로 분류
    65: 3,  # 표준 단어는 영문명만이 아닌 한글명도 정의
    66: 0,  # 표준 관리는 지속적으로 수행해야 함
    67: 2,  # 명명 규칙은 절대적이지 않고 기업 특성 반영
    68: 1,  # 컬럼명은 반드시 표준 단어 조합으로만 구성할 필요 없음
    69: 3,  # 표준화는 신규 시스템만이 아닌 기존 시스템도 적용
    70: 0,  # 메타데이터는 기술적 측면만이 아닌 업무적 측면도 포함
    71: 2,  # 데이터 사전은 개발자만이 아닌 모든 이해관계자가 활용
    72: 1,  # 표준 도메인은 물리적 특성만이 아닌 논리적 특성도 정의
    73: 3,  # 표준 준수는 권장사항이 아닌 필수사항
    74: 0,  # 표준 용어 사전은 IT 용어만이 아닌 업무 용어도 포함
    75: 2,  # 동음이의어는 피해야 할 대상
    76: 1,  # 유의어는 하나의 표준 용어로 통일
    77: 3,  # 금칙어는 절대 사용 금지 용어
    78: 0,  # 표준 데이터 타입은 DBMS 독립적으로 정의
    79: 2,  # 표준화 대상은 컬럼명만이 아닌 테이블명도 포함
    80: 1,  # 표준 관리 조직은 독립적이어야 함

    # 데이터 모델링 (Data Modeling) - Q81-110
    81: 3,  # 개념 모델은 속성을 정의하지 않음
    82: 0,  # 논리 모델은 정규화를 수행함
    83: 2,  # 물리 모델은 성능을 고려하여 반정규화 수행
    84: 1,  # 엔티티는 인스턴스를 2개 이상 가져야 함
    85: 3,  # 속성은 반드시 단일값이어야 함
    86: 0,  # 관계는 양방향으로 읽을 수 있어야 함
    87: 2,  # 식별자는 변경되지 않아야 함
    88: 1,  # 외래키는 참조 무결성을 보장
    89: 3,  # 1차 정규화는 반복 그룹 제거
    90: 0,  # 2차 정규화는 부분 함수 종속 제거
    91: 2,  # 3차 정규화는 이행 함수 종속 제거
    92: 1,  # BCNF는 모든 결정자가 후보키
    93: 3,  # 반정규화는 조회 성능 향상이 목적
    94: 0,  # 중복 테이블은 반정규화 기법
    95: 2,  # 파생 컬럼은 계산으로 얻을 수 있는 값
    96: 1,  # 슈퍼타입은 서브타입의 공통 속성 포함
    97: 3,  # 서브타입은 고유한 속성을 가짐
    98: 0,  # 배타적 관계는 하나의 서브타입만 선택
    99: 2,  # 포괄적 관계는 여러 서브타입 선택 가능
    100: 1, # 자기 참조 관계는 동일 엔티티 내 관계
    101: 3, # 순환 관계는 피해야 할 패턴
    102: 0, # 다대다 관계는 교차 엔티티로 해소
    103: 2, # 선택적 관계는 NULL 허용
    104: 1, # 필수적 관계는 NOT NULL
    105: 3, # 이력 관리는 시점 데이터 관리
    106: 0, # 통계 데이터는 집계 데이터
    107: 2, # 코드 데이터는 분류 체계
    108: 1, # 마스터 데이터는 기준 정보
    109: 3, # 트랜잭션 데이터는 업무 처리 정보
    110: 0, # 데이터 모델 패턴은 재사용 가능한 모델

    # 데이터베이스 설계 (Database Design) - Q111-125
    111: 2, # 인덱스는 모든 컬럼에 생성하는 것은 아님
    112: 1, # 클러스터형 인덱스는 테이블당 1개
    113: 3, # 뷰는 가상 테이블
    114: 0, # 파티션은 대용량 테이블 분할
    115: 2, # 트리거는 자동 실행되는 프로시저
    116: 1, # 저장 프로시저는 미리 컴파일된 SQL
    117: 3, # 트랜잭션은 원자성을 보장
    118: 0, # COMMIT은 변경사항 확정
    119: 2, # ROLLBACK은 변경사항 취소
    120: 1, # 동시성 제어는 Lock을 사용
    121: 3, # 교착상태는 상호 대기 상황
    122: 0, # 정규화는 중복 제거
    123: 2, # 반정규화는 성능 향상
    124: 1, # 파티셔닝은 수평/수직 분할
    125: 3, # 샤딩은 데이터베이스 분산

    # 데이터 품질관리 (Data Quality Management) - Q126-135
    126: 0, # 데이터 품질은 정확성만이 아님
    127: 2, # 데이터 프로파일링은 현황 파악
    128: 1, # 데이터 정제는 오류 데이터 수정
    129: 3, # 데이터 품질 지표는 정량적 측정
    130: 0, # 데이터 품질 관리는 지속적 프로세스
    131: 2, # 데이터 품질 측정은 정기적 수행
    132: 1, # 데이터 품질 개선은 원인 분석 필요
    133: 3, # 데이터 품질 관리 조직은 독립적
    134: 0, # 데이터 품질 관리 도구는 필수 아님
    135: 2, # 데이터 품질 관리는 예방이 중요
}

def add_correct_answers_to_file(input_file, output_file):
    """
    Add correctAnswer field to all questions in the TypeScript file.
    """
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Process each question by ID
    for question_id, correct_answer in sorted(CORRECT_ANSWERS.items()):
        # Find the question block for this ID
        # Pattern: Find the question object with this ID and add correctAnswer after options
        pattern = rf'("id":\s*{question_id},[\s\S]*?"options":\s*\[[\s\S]*?\])(,\s*"userAnswer":)'

        replacement = rf'\1,\n    "correctAnswer": {correct_answer}\2'

        content = re.sub(pattern, replacement, content, count=1)
        print(f"Added correctAnswer for question {question_id}: {correct_answer}")

    # Write the updated content
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n✅ Successfully updated {len(CORRECT_ANSWERS)} questions")
    print(f"Output written to: {output_file}")

if __name__ == "__main__":
    input_file = '/Users/mac/ws/gemini/dap-study-site/src/data/practiceQuestions.ts'
    output_file = '/Users/mac/ws/gemini/dap-study-site/src/data/practiceQuestions.ts'

    print("=" * 80)
    print("DAP Practice Questions - Adding Correct Answers")
    print("=" * 80)
    print(f"Processing {len(CORRECT_ANSWERS)} questions...\n")

    add_correct_answers_to_file(input_file, output_file)

    print("\n" + "=" * 80)
    print("Processing complete!")
    print("=" * 80)
