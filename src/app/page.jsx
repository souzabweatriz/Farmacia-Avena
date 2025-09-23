"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import questionsList from "../data/questionsList";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({});
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);

  useEffect(() => {
    async function fetchCategorias() {
      setCarregandoCategorias(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL_CATEGORIA || "http://localhost:4000/api/categorias");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        setErro("Erro ao carregar categorias. Tente novamente mais tarde.");
      } finally {
        setCarregandoCategorias(false);
      }
    }
    fetchCategorias();
  }, []);

  const perguntas = questionsList.map((p) =>
    p.id === "categoria"
      ? {
          ...p,
          opcoes: categorias.map((cat) => ({
            value: String(cat.id),
            label: cat.nome_categoria || cat.nome,
          })),
        }
      : p
  );

  const handleFormulario = (id, value) => {
    setFormulario((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      const res = await fetch("http://localhost:4000/api/remedios");
      if (!res.ok) throw new Error("Erro ao buscar chás");
      const data = await res.json();
      const cha = data.find(r => r.categoria_id === Number(formulario.categoria));
      setResultado(cha || null);
      if (!cha) setErro("Não encontramos um chá para essa categoria.");
    } catch (err) {
      setErro("Não foi possível buscar o chá recomendado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const podeEnviar = !!formulario.categoria && !loading;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Bem-vindo à Farmácia Avena</h1>
        <p>Sua saúde em primeiro lugar!</p>
      </div>
      <div className={styles.content}>
        {carregandoCategorias && <p>Carregando categorias...</p>}
        {!resultado && !carregandoCategorias && (
          <form onSubmit={handleSubmit}>
            {perguntas.map(perg => (
              <fieldset key={perg.id} style={{ marginBottom: 20 }}>
                <legend>{perg.texto}</legend>
                {perg.opcoes.length === 0 && perg.id === "categoria" ? (
                  <p style={{ color: "#888", fontStyle: "italic" }}>Nenhuma categoria encontrada.</p>
                ) : (
                  perg.opcoes.map(op =>
                    typeof op === "string" ? (
                      <label key={op} style={{ marginRight: 16 }}>
                        <input
                          type="radio"
                          name={perg.id}
                          value={op}
                          checked={formulario[perg.id] === op}
                          onChange={() => handleFormulario(perg.id, op)}
                        />
                        {op}
                      </label>
                    ) : (
                      <label key={op.value} style={{ marginRight: 16 }}>
                        <input
                          type="radio"
                          name={perg.id}
                          value={op.value}
                          checked={formulario[perg.id] == op.value}
                          onChange={() => handleFormulario(perg.id, op.value)}
                        />
                        {op.label}
                      </label>
                    )
                  )
                )}
              </fieldset>
            ))}
            <button type="submit" disabled={!podeEnviar}>
              {loading ? "Buscando..." : "Ver chá recomendado"}
            </button>
          </form>
        )}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {resultado && (
          <section>
            <h2>Chá recomendado</h2>
            <h3>{resultado.nome_remedio}</h3>
            {resultado.photo && <img src={resultado.photo} alt={resultado.nome_remedio} width="200" />}
            <p><b>Efeito:</b> {resultado.efeito_remedio}</p>
            <p><b>Modo de preparo:</b> {resultado.modo_preparo}</p>
            <p><b>Contraindicações:</b> {resultado.contraindicacoes}</p>
            <button onClick={() => { setResultado(null); setFormulario({}); }}>Escolher outro chá</button>
          </section>
        )}
      </div>
    </div>
  );
}