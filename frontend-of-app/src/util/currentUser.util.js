// 登录时存储用户信息
export const loginUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('currentUser:', user);
};

// 获取当前登录用户信息
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};
