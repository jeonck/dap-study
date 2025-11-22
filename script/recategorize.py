import re
import json

def get_category_by_keyword(question_text):
    if "요건" in question_text or "요구" in question_text or "CRUD" in question_text or "Usecase" in question_text:
        return "데이터 요건 분석"
    elif "표준" in question_text or "도메인" in question_text or "코드" in question_text:
        return "데이터 표준화"
    elif "모델링" in question_text or "엔터티" in question_text or "속성" in question_text or "관계" in question_text or "ERD" in question_text or "식별자" in question_text:
        return "데이터 모델링"
    elif "품질" in question_text or "정합성" in question_text or "오류" in question_text or "라이프사이클" in question_text:
        return "데이터 품질 관리"
    elif "데이터베이스" in question_text or "DB" in question_text or "성능" in question_text or "인덱스" in question_text or "백업" in question_text or "복구" in question_text:
        return "데이터베이스 설계와 이용"
    elif "전사아키텍처" in question_text or "EA" in question_text or "엔터프라이즈" in question_text:
        return "전사아키텍처 이해"
    else:
        return "기타"

def recategorize_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the array of questions
    match = re.search(r'export const practiceQuestions: PracticeQuestion\[\] = (.*\]);', content, re.DOTALL)
    if not match:
        return None
    
    questions_str = match.group(1)
    # A bit of a hack to load the JS array as JSON:
    # 1. Replace single quotes with double quotes if any (though not in this file)
    # 2. Remove trailing commas from the last element in arrays/objects
    questions_str = questions_str.replace('`', '"').replace("'", '"')
    questions_str = re.sub(r',\s*\]', ']', questions_str)
    questions_str = re.sub(r',\s*\}', '}', questions_str)
    # In javascript object keys may not be quoted
    questions_str = re.sub(r'(\w+):', r'"\1":', questions_str)
    
    try:
        questions = json.loads(questions_str)
    except json.JSONDecodeError:
        # Fallback for more complex cases, manual cleaning
        # This is risky, but for this specific file it might work
        questions_str = questions_str.replace('question: "', 'question": "')
        questions_str = questions_str.replace('options: [', 'options": [')
        questions_str = questions_str.replace('userAnswer: null', 'userAnswer": null')
        questions_str = questions_str.replace('isMarked: false', 'isMarked": false')
        questions_str = re.sub(r'(\w+):', r'"\1":', questions_str)
        questions = json.loads(questions_str)


    for q in questions:
        q['category'] = get_category_by_keyword(q['question'])

    return questions

def generate_ts_code(questions):
    ts_code = "export interface PracticeQuestion {\n"
    ts_code += "  id: number;\n"
    ts_code += "  category: string;\n"
    ts_code += "  question: string;\n"
    ts_code += "  options: string[];\n"
    ts_code += "  userAnswer: number | null;\n"
    ts_code += "  isMarked: boolean;\n"
    ts_code += "}\n\n"
    ts_code += "export const practiceQuestions: PracticeQuestion[] = [\n"

    for q in sorted(questions, key=lambda x: x['id']):
        question_escaped = json.dumps(q['question'])
        category_escaped = json.dumps(q['category'])
        
        ts_code += "  {\n"
        ts_code += f"    id: {q['id']},\n"
        ts_code += f"    category: {category_escaped},\n"
        ts_code += f"    question: {question_escaped},\n"
        ts_code += "    options: [\n"
        
        q_options = q.get('options', [])
        while len(q_options) < 4:
            q_options.append("")
            
        for opt in q_options[:4]:
            option_escaped = json.dumps(opt)
            ts_code += f"      {option_escaped},\n"
        ts_code += "    ],\n"
        ts_code += "    userAnswer: null,\n"
        ts_code += "    isMarked: false\n"
        ts_code += "  },\n"
    
    ts_code += "];\n"
    return ts_code


if __name__ == "__main__":
    questions = recategorize_questions('dap-study-site/src/data/practiceQuestions.ts')
    if questions:
        ts_output = generate_ts_code(questions)
        print(ts_output)
