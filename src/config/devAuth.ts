
export const devAuthData = () => {
  return {
    isAuthenticated: true,
    user: {
      name: "Usuario de Desarrollo",
      email: "dev@example.com",
      roles: ["paciente"]
    },
    login: () => Promise.resolve(true),
    logout: () => Promise.resolve()
  };
};
  
export const useDevAuth = () => {
  return devAuthData;
};