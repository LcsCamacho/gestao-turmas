import UseApiPrivate from "@/services/apiPrivate";

export const TurmasServices = {
  async getTurmasByProfessorEmail(email: string) {
    const { data } = await UseApiPrivate().get(`/turmas?email=${email}`);
    return data;
  },
  async createTurma(nome: string, email: string) {
    const { data } = await UseApiPrivate().post("/turmas", {
      nome,
      email,
    });
    return data;
  },
  async deleteTurma(id: number) {
    const { data } = await UseApiPrivate().delete(`/turmas?id=${id}`);
    return data;
  },
};
