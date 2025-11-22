import re
import json

def get_category(q_id):
    if 1 <= q_id <= 20:
        return "전사아키텍처 이해"
    elif 21 <= q_id <= 40:
        return "데이터아키텍처"
    elif 41 <= q_id <= 64:
        return "정보 요구사항 분석"
    elif 65 <= q_id <= 106:
        return "데이터 표준화"
    elif 107 <= q_id <= 135:
        return "데이터 모델링"
    # New questions categories
    elif 136 <= q_id <= 140:
        return "전사아키텍처 개요"
    elif 141 <= q_id <= 145:
        return "전사아키텍처 구축"
    elif 146 <= q_id <= 150:
        return "전사아키텍처 관리 및 활용"
    return "기타"

def parse_questions(combined_text, correct_answers_map):
    # Remove the source attribution at the end
    combined_text = re.sub(r'\\[출처:.*\\]', '', combined_text, flags=re.DOTALL).strip()
    
    # Split the text into question blocks based on the numbering
    question_blocks = re.split(r'\n\n(?=\*?문제 \d+\\.s)', combined_text.strip())
    
    questions = []
    current_q_id = 0
    for block in question_blocks:
        block = block.strip()
        if not block:
            continue

        # Use regex to capture the question number, text, and options
        parts = re.split(r'\n', block)
        question_line = parts[0]
        
        match = re.match(r'(?:\\*?문제\\s*)?(\\d+)\\.s(.*)', question_line)
        if not match:
            continue
            
        q_id = int(match.group(1))
        
        # Adjust q_id for the new questions to avoid conflicts with original 1-135 range
        if q_id <= 135:
            current_q_id = q_id
        else:
            current_q_id += 1 # Increment for new questions if they are numbered starting from 1 again

        q_text = match.group(2).strip()
        
        # The rest of the parts are the options
        options_str = '\n'.join(parts[1:]).strip()
        
        # Extract options from text that start with ①, ②, ③, ④
        option_matches = re.findall(r'[①②③④]\s*(.*?)(?=\s*[②③④]|\s*해설|\s*$)', options_str, re.DOTALL)
        
        cleaned_options = [opt.strip() for opt in option_matches if opt.strip()]

        # Get correct answer from map, default to None if not found
        correct_answer = correct_answers_map.get(current_q_id, None)

        questions.append({
            "id": current_q_id,
            "category": get_category(current_q_id),
            "question": q_text,
            "options": cleaned_options,
            "userAnswer": None,
            "correctAnswer": correct_answer,
            "isMarked": False
        })
        
    return questions

def write_ts_file(questions, output_path):
    ts_code = "// @ts-nocheck\n"
    ts_code += "export interface PracticeQuestion {\n"
    ts_code += "  id: number\n"
    ts_code += "  category: string\n"
    ts_code += "  question: string\n"
    ts_code += "  options: string[]\n"
    ts_code += "  userAnswer: number | null\n"
    ts_code += "  correctAnswer: number | null // Added correctAnswer field\n"
    ts_code += "  isMarked: boolean\n"
    ts_code += "}\n\n"
    ts_code += "export const practiceQuestions: PracticeQuestion[] = "
    
    json_str = json.dumps(questions, indent=2, ensure_ascii=False)
    
    ts_code += json_str
    ts_code += ";\n"

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)

if __name__ == "__main__":
    # Correct answers for the new questions (136-150)
    # The value is the index of the correct option (0-indexed)
    new_questions_correct_answers = {
        136: 2, # 문제 1. 아키텍처의 핵심 구성요소로 거리가 가장 먼 것은? -> 사람(Human) (option 3, index 2)
        137: 0, # 문제 2. 전사아키텍처 프레임워크에 대한 내용 중 가장 맞지 않는 것은? -> ① (option 1, index 0)
        138: 3, # 문제 3. 전사아키텍처 참조 모델에 대한 내용 중 가장 적절치 않는 것은? -> ④ (option 4, index 3)
        139: 2, # 문제 4. 데이터 참조 모델의 활용 효과와 가장 거리가 먼 것은? -> ③ (option 3, index 2)
        140: 3, # 문제 5. 전사아키텍처 프로세스의 공정과 수행 내용의 연결 중 가장 잘못된 것은? -> ④ (option 4, index 3)
        141: 2, # 전사아키텍처 구축 문제 1. 전사아키텍처 환경 분석 시 수행하는 작업과 가장 거리가 먼 것은? -> ③ (option 3, index 2)
        142: 0, # 전사아키텍처 구축 문제 2. 아키텍처 매트릭스에 대한 설명 중 가장 맞는 것은? -> ① (option 1, index 0)
        143: 2, # 전사아키텍처 구축 문제 3. 전사아키텍처 정보 구성 정의 시의 참조 모델 관련 설명 중 가장 적합하지 않는 것은? -> ③ (option 3, index 2)
        144: 0, # 전사아키텍처 구축 문제 4. 데이터아키텍처 정보 구축의 대상으로 가장 거리가 먼 것은? -> ① (option 1, index 0)
        145: 1, # 전사아키텍처 구축 문제 5. 비즈니스 아키텍처 정보 구축의 대상으로 가장 거리가 먼 것은? -> ② (option 2, index 1)
        146: 2, # 전사아키텍처 관리 및 활용 문제 1. 전사아키텍처 관리 체계 구축에 대한 설명으로 가장 적절치 않는 것은? -> ③ (option 3, index 2)
        147: 1, # 전사아키텍처 관리 및 활용 문제 2. 구축된 전사아키텍처 정보를 효과적으로 활용하기 위해서 고려되어야 할 사항 중 가장 관계가 먼 것은? -> ② (option 2, index 1)
        148: 0, # 전사아키텍처 관리 및 활용 문제 3. 전사아키텍처 관리 시스템에 대한 설명 중 가장 적절치 않는 것은? -> ① (option 1, index 0)
        149: 3, # 전사아키텍처 관리 및 활용 문제 4. 전사아키텍처 이행계획의 핵심 작업 내용과 가장 거리가 먼 것은? -> ④ (option 4, index 3)
        150: 2  # 전사아키텍처 관리 및 활용 문제 5. 전사아키텍처 활용의 영역을 구분한 것 중 가장 부적절한 것은? -> ③ (option 3, index 2)
    }

    with open('script/parse_questions_v5.py', 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    with open('new_questions.txt', 'r', encoding='utf-8') as f:
        new_content = f.read()

    # Combine original questions and new questions
    # The original file has `text = """..."""`, so we need to extract the content of `text`
    original_text_match = re.search(r'text = \"\"\"(.*)\\