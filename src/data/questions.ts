/**
 * 残疾预防线上活动——选择题题库
 * 每道题包含题干、选项、正确答案、解析
 */

export interface Question {
  question: string; // 题干
  options: string[]; // 选项
  answer: string; // 正确答案（如 'B'）
  explanation: string; // 解析
}

export const questions: Question[] = [
  {
    question: '1. 预防儿童听力残疾的关键措施是？',
    options: [
      'A. 避免使用耳机',
      'B. 新生儿听力筛查',
      'C. 减少噪音暴露',
      'D. 补充维生素',
    ],
    answer: 'B',
    explanation: '早期筛查可及时发现听力障碍，干预越早效果越好',
  },
  {
    question: '2. 以下哪种疫苗可预防可能导致残疾的疾病？',
    options: [
      'A. 麻疹疫苗',
      'B. 乙肝疫苗',
      'C. 脊髓灰质炎疫苗',
      'D. 以上都是',
    ],
    answer: 'D',
    explanation: '麻疹、乙肝、脊髓灰质炎疫苗均可预防相关致残疾病',
  },
  {
    question: '3. 孕妇补充叶酸的主要目的是预防？',
    options: [
      'A. 贫血',
      'B. 先天性神经管缺陷',
      'C. 妊娠高血压',
      'D. 胎儿过大',
    ],
    answer: 'B',
    explanation: '叶酸缺乏是胎儿神经管畸形的主要原因，孕前3个月至孕早期补充叶酸可有效预防',
  },
  {
    question: '4. 残疾预防分为几级？',
    options: [
      'A. 一级',
      'B. 二级',
      'C. 三级',
      'D. 四级',
    ],
    answer: 'C',
    explanation: '残疾预防分为三级：一级预防（病因预防）； 二级预防（早期发现干预）； 三级预防（康复治疗）',
  },
  {
    question: '5. 预防糖尿病并发症致残的方法包括？',
    options: [
      'A. 控制血糖',
      'B. 监测血压',
      'C. 戒烟限酒',
      'D. 以上都是',
    ],
    answer: 'D',
    explanation: '无',
  },
]; 