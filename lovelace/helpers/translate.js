const translatedFields = {
  "name": "Nome",
  "email": "E-mail",
  "state": "Estado",
  "age": "Idade",
  "linkedin": "Linkedin",
  "github": "Github",
  "skills": "Competências",
  "interests": "Interesses",
  "company": "Empresa",
  "marketTime": "Tempo de mercado"
}

export const translate = (field) => {
  return translatedFields[field]
}