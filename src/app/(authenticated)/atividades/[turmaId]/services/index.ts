import UseApiPrivate from "@/services/apiPrivate";

interface CreateAtividade {
  turmaId: string;

  descricao: string;
  titulo: string;
}

export const AtividadesServices = {
  async getAtividadesByTurmaId(turmaId: string) {
    const { data } = await UseApiPrivate().get(
      `/atividades?turmaId=${turmaId}`
    );
    return data;
  },
  async createAtividade({ turmaId, descricao, titulo }: CreateAtividade) {
    const { data } = await UseApiPrivate().post("/atividades", {
      turmaId,
      descricao,
      titulo,
    });
    return data;
  },
};
