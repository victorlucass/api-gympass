export class UserProfileExistsError extends Error {
  constructor() {
    super('Usuário não encontrado')
  }
}
