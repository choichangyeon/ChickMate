export const getSample = async () => {
  try {
    const response = await fetch('/api/sample/1', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getSample 에러:', error);
    throw error;
  }
};

export const postSample = async (title: string) => {
  try {
    const response = await fetch('/api/sample/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Sample 생성 실패');
    }

    const data = await response.json();
    console.log('새로운 Sample:', data);
    return data;
  } catch (error) {
    console.error('postSample 에러:', error);
    throw error;
  }
};
