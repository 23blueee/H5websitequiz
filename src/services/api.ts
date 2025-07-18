import axios from 'axios';

/* ===== 错误码定义 ===== */

// 后端返回的错误码常量
export const ERROR_CODES = {
  SUCCESS: 200,
  DUPLICATE_PHONE: 3001,    // 重复手机号
  QUOTA_EXCEEDED: 3002,     // 名额已满
  ACTIVITY_ENDED: 3003,     // 活动结束
  INVALID_DATA: 4001,       // 数据无效
  SERVER_ERROR: 5000,       // 服务器错误
} as const;

// 错误信息映射
export const ERROR_MESSAGES = {
  [ERROR_CODES.DUPLICATE_PHONE]: "该手机号已存在，请使用其他手机号",
  [ERROR_CODES.QUOTA_EXCEEDED]: "很抱歉，活动名额已满，感谢您的参与！",
  [ERROR_CODES.ACTIVITY_ENDED]: "很抱歉，活动已结束，感谢您的参与！",
  [ERROR_CODES.INVALID_DATA]: "提交的数据无效，请检查后重试",
  [ERROR_CODES.SERVER_ERROR]: "服务器错误，请稍后重试",
} as const;

/* ===== API服务配置 ===== */

// 创建Axios实例
const api = axios.create({
  // 使用相对路径，通过Vite代理访问后端
  baseURL: '', // 使用相对路径
  timeout: 15000, // 15秒超时
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 自定义错误类型
interface ApiError extends Error {
  response?: import('axios').AxiosResponse;
  code?: number;
}

// 请求拦截器 - 添加通用处理逻辑
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    console.log('发送请求:', config.url, config.data);
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一处理响应
api.interceptors.response.use(
  (response) => {
    console.log('收到响应:', response.data);
    
    // 检查后端返回的业务状态码
    if (response.data && response.data.code !== ERROR_CODES.SUCCESS) {
      // 如果业务状态码不是200，抛出错误
      const error: ApiError = new Error(response.data.msg || '请求失败');
      error.response = response;
      error.code = response.data.code;
      return Promise.reject(error);
    }
    
    return response;
  },
  (error) => {
    console.error('响应错误:', error.response?.data || error.message);
    
    // 更详细的错误处理
    if (error.code === 'ERR_NETWORK') {
      console.error('网络错误 - 可能是CORS问题或服务器不可达');
    } else if (error.response?.status === 404) {
      console.error('API端点不存在');
    } else if (error.response?.status === 403) {
      console.error('访问被拒绝 - 可能需要认证');
    }
    
    return Promise.reject(error);
  }
);

/* ===== 表单提交接口 ===== */

// 表单数据接口定义 - 匹配后端API字段
export interface FormData {
  name: string;
  phone: string;
  site: string;
}

// 名额数量接口定义
export interface QuotaCount {
  total: number;
  used: number;
  count: number; // 总名额
  remaining: number; // 剩余名额 = count - used
}

// 获取名额数量接口
export const getQuotaCount = async (): Promise<QuotaCount> => {
  try {
    const response = await api.get('/api/tmp-activity/cjyf/count');
    console.log('原始API响应:', response.data);
    console.log('返回的数据结构:', response.data.data);
    
    const data = response.data.data;
    console.log('API返回的完整数据结构:', data);
    console.log('API返回的used字段:', data.used);
    console.log('API返回的used字段类型:', typeof data.used);
    
    // 固定总名额为350个
    const totalQuota = 350;
    // 已使用名额（从API获取，如果没有则默认为0）
    let used = data.used;
    if (used === undefined) {
      used = 0;
      console.log('警告：后端没有返回used字段，使用默认值0');
    }
    // 计算剩余名额
    const remaining = Math.max(0, totalQuota - used);
    
    console.log('=== 名额计算调试信息 ===');
    console.log('固定总名额:', totalQuota);
    console.log('已使用名额:', used);
    console.log('计算出的剩余名额:', remaining);
    console.log('========================');
    
    return {
      total: totalQuota,
      used: used,
      count: totalQuota,
      remaining: remaining
    };
  } catch (error) {
    console.error('获取名额数量失败:', error);
    // 如果获取失败，返回默认值
    return {
      total: 350,
      used: 0,
      count: 350,
      remaining: 350
    };
  }
};

// 提交表单接口 - 通过代理访问后端
export const submitForm = async (formData: FormData) => {
  try {
    const response = await api.post('/api/tmp-activity/cjyf', formData);
    return response.data;
  } catch (error) {
    // 如果是网络错误，提供更友好的错误信息
    if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
      throw new Error('网络连接失败，请检查网络连接或联系管理员');
    }
    throw error;
  }
};

export default api; 