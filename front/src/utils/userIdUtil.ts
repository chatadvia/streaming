export const getUserId = (): string => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("User ID não encontrado no localStorage."); // Exibe um aviso no console
      throw new Error("User ID não encontrado no localStorage.");
    }
    return userId;
  };
  