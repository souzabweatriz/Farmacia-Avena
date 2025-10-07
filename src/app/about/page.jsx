import styles from "../about/about.module.css";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <div className={styles.container}>
             <div className={styles.apresentation}>
                <p className={styles.title}>Sobre mim</p>
                <p className={styles.photo}>
                   <Image
                    className={styles.photo}
                    src="/images/foto-ana.png"
                    alt="Foto da Ana Beatriz"
                    width={200}
                    height={210}
                    priority
                />
                </p>
                <h1 className={styles.title}>Ana Beatriz de Souza de Oliveira</h1>
                <p className={styles.description}>
                    Olá! Sou a Ana, aluna do curso Técnico de Desenvolvimento de Sistemas no SENAI Valinhos e tenho 17 anos.

                    Criei este site como parte do meu projeto de curso, pensando em pessoas que não gostam muito de tomar remédios tradicionais ou que, por questões de saúde, alergias ou restrições, não podem consumir alguns medicamentos convencionais. Aqui, você encontra alternativas naturais, como chás, extratos de plantas, pós e outros produtos cuidadosamente selecionados para ajudar no cuidado da saúde de uma forma mais leve, saudável e alinhada ao bem-estar.

                    A ideia surgiu ao perceber que muitas pessoas buscam opções mais naturais para tratar sintomas comuns, melhorar a qualidade de vida ou simplesmente manter o equilíbrio do corpo sem recorrer a fórmulas químicas. Por isso, o site foi desenvolvido para ser um espaço acolhedor, informativo e seguro, onde é possível conhecer diferentes produtos naturais e aprender sobre seus benefícios.

                    O projeto conta com um back-end próprio, pensado para facilitar a busca e recomendação dos produtos de acordo com o seu perfil e necessidades. Isso torna a experiência muito mais personalizada e acessível, permitindo que cada usuário encontre rapidamente aquilo que está procurando e receba sugestões que realmente fazem sentido para seu bem-estar.

                    Espero que o site seja útil para você e que possa ajudar a encontrar opções naturais para o seu dia a dia, promovendo saúde, equilíbrio e qualidade de vida. Aproveite para explorar, conhecer novos produtos e descobrir como a natureza pode ser uma grande aliada no cuidado com você mesmo!

                    Se tiver sugestões, dúvidas ou quiser compartilhar sua experiência, fique à vontade para entrar em contato. Sua opinião é muito importante para mim e para o aprimoramento do projeto!

                    Bem-vindo(a) e boa navegação!
                </p>
                <div className={styles.socialLinks}>
                    <Link className={styles.link} href="https://www.instagram.com/souzabweatriz_?igsh=MWUzaHFrOTh5N2prZA%3D%3D&utm_source=qr" title="Instagram">Instagram</Link>
                    <Link className={styles.link} href="https://www.linkedin.com/in/ana-beatriz-de-souza-745b222b1" title="LinkedIn">LinkedIn</Link>
                    <Link className={styles.link} href="https://github.com/souzabweatriz" title="GitHub">GitHub</Link>
                </div>
            </div>
            <div className={styles.apresentation}>

            <h1 className={styles.title}>Sobre o Projeto</h1>
            <p className={styles.description}>
                Este site foi criado por Ana Beatriz de Souza de Oliveira, aluna do curso Técnico de Desenvolvimento de Sistemas no SENAI Valinhos, como projeto para o curso. O objetivo principal é oferecer alternativas naturais para pessoas que não gostam ou não podem consumir medicamentos tradicionais, utilizando chás e extratos de plantas para promover saúde e bem-estar.
            </p>
            <div className={styles.aboutSite}>
                <p className={styles.aboutDescription}>
                    O desenvolvimento foi realizado com Next.js no front-end, aproveitando rotas dinâmicas para exibir detalhes de cada chá. O back-end foi feito em Node.js e Express, expondo uma API REST que fornece dados dos produtos, categorias e recomendações personalizadas.
                </p>
                <pre className={styles.codeBlock}>
                    {`
src/
└── app/
    ├── products/
    │   ├── page.jsx           // Lista de chás
    │   └── [id]/
    │       └── page.jsx       // Detalhes do chá pelo id
    ├── contact/
    │   └── page.jsx           // Sobre a autora
    ├── about/
    │   └── page.jsx           // Sobre o projeto
`}
                </pre>
                <section className={styles.section}>
                    <h2>🛠 Endpoints da API</h2>
                    <p className={styles.description}>
                        O site faz requisições dinâmicas para buscar e filtrar os produtos conforme a necessidade do usuário, tornando a experiência personalizada e eficiente. Exemplos de requisições ao back-end:
                    </p>
                    <ul>
                        <li>
                            <code>GET http://localhost:4000/api/remedios/1</code> — retorna os detalhes do chá com id 1.
                        </li>
                        <li>
                            <code>GET http://localhost:4000/api/remedios/categoria/1</code> — lista todos os chás da categoria 1.
                        </li>
                        <li>
                            <code>GET http://localhost:4000/api/categorias</code> — retorna todas as categorias disponíveis.
                        </li>
                    </ul>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Método</th>
                                <th>Path</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>GET</td>
                                <td><code>/categorias</code></td>
                                <td>Retorna todas as categorias cadastradas.</td>
                            </tr>
                            <tr>
                                <td>GET</td>
                                <td><code>/categorias/{'{id}'}</code></td>
                                <td>Retorna uma categoria específica pelo ID.</td>
                            </tr>
                            <tr>
                                <td>GET</td>
                                <td><code>/remedios</code></td>
                                <td>Retorna todos os remédios (chás) cadastrados.</td>
                            </tr>
                            <tr>
                                <td>GET</td>
                                <td><code>/remedios/categoria/{'{categoria_id}'}</code></td>
                                <td>Retorna todos os remédios de uma categoria específica.</td>
                            </tr>
                            <tr>
                                <td>GET</td>
                                <td><code>/remedios/{'{id}'}</code></td>
                                <td>Retorna os detalhes de um remédio específico pelo ID.</td>
                            </tr>
                            <tr>
                                <td>POST</td>
                                <td><code>/remedios</code></td>
                                <td>Cadastra um novo remédio.</td>
                            </tr>
                            <tr>
                                <td>PUT</td>
                                <td><code>/remedios/{'{id}'}</code></td>
                                <td>Atualiza os dados de um remédio existente.</td>
                            </tr>
                            <tr>
                                <td>DELETE</td>
                                <td><code>/remedios/{'{id}'}</code></td>
                                <td>Remove um remédio do sistema.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            </div>
        </div>
    );
}