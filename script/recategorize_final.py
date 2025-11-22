import re
import json

def get_category_by_keyword(question_text):
    # More specific keywords for each category
    if "요건" in question_text or "요구" in question_text or "CRUD" in question_text or "Usecase" in question_text or "상관분석" in question_text or "프로세스" in question_text and "계층도" in question_text:
        return "데이터 요건 분석"
    elif "표준" in question_text or "도메인" in question_text or "코드" in question_text or "명칭" in question_text or "용어" in question_text or "사전" in question_text:
        return "데이터 표준화"
    elif "모델링" in question_text or "엔터티" in question_text or "속성" in question_text or "관계" in question_text or "ERD" in question_text or "식별자" in question_text or "무결성" in question_text or "정규화" in question_text or "개체" in question_text:
        return "데이터 모델링"
    elif "품질" in question_text or "정합성" in question_text or "오류" in question_text or "라이프사이클" in question_text or "크린징" in question_text:
        return "데이터 품질 관리"
    elif "데이터베이스" in question_text or "DB" in question_text or "성능" in question_text or "인덱스" in question_text or "백업" in question_text or "복구" in question_text or "분산" in question_text or "파티션" in question_text:
        return "데이터베이스 설계와 이용"
    elif "전사아키텍처" in question_text or "EA" in question_text or "엔터프라이즈" in question_text or "프레임워크" in question_text or "참조모델" in question_text:
        return "전사아키텍처 이해"
    
    # Fallback for questions that are still hard to categorize
    if "관리자" in question_text and "역할" in question_text:
        return "데이터 표준화" # Often related to governance
    if "프로세스" in question_text:
        return "데이터 요건 분석"
        
    return "기타"


def recategorize_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []
    question_blocks = re.findall(r'\{\s*id:.*?\s*\}', content, re.DOTALL)

    for block in question_blocks:
        try:
            q_id_match = re.search(r'id:\s*(\d+)', block)
            q_category_match = re.search(r'category:\s*"(.*?)"', block)
            q_question_match = re.search(r'question:\s*"(.*?)"', block, re.DOTALL)
            
            if not q_id_match or not q_question_match or not q_category_match:
                continue

            q_id = int(q_id_match.group(1))
            q_category = q_category_match.group(1)
            q_question = json.loads(f'\"{q_question_match.group(1)}\