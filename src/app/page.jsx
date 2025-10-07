"use client"
import styles from "./page.module.css"
import { useState, useEffect } from "react";
import { Carousel, Button, Modal } from 'antd';
import BuyCard from "../components/BuyCard/page.jsx";
import SectionNeed from "../components/SectionNeed/page.jsx";

const perguntasEnfeite = [
  { id: "schedule", texto: "What time of day do you prefer to drink tea?", opcoes: ["Morning", "Afternoon", "Evening"] },
  { id: "temperature", texto: "Do you prefer hot or cold tea?", opcoes: ["Hot", "Cold"] },
  { id: "frequency", texto: "How often do you drink tea?", opcoes: ["Daily", "Weekly", "Occasionally"] },
  { id: "flavor", texto: "What tea flavor do you prefer?", opcoes: ["Fruity", "Herbal", "Citrus", "Sweet"] },
  { id: "benefit", texto: "What benefit do you seek from tea?", opcoes: ["Relaxation", "Energy", "Digestion", "Immunity"] },
  { id: "ingredients", texto: "Do you have any preference for specific ingredients?", opcoes: ["Chamomile", "Mint", "Ginger", "Fennel", "Other"] },
  { id: "sugar", texto: "Do you prefer tea with or without sugar?", opcoes: ["With sugar", "Without sugar", "With sweetener"] },
  { id: "caffeine", texto: "Do you prefer tea with or without caffeine?", opcoes: ["With caffeine", "Without caffeine"] },
  { id: "quantity", texto: "How many cups of tea would you like to drink per day?", opcoes: ["1-2", "3-4", "5 or more"] },
  { id: "occasion", texto: "On what occasion do you usually drink tea?", opcoes: ["Relax at home", "At work", "With friends/family", "Other"] },
];

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [enfeite, setEnfeite] = useState({});
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQuestionario, setShowQuestionario] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setShowQuestionario(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setShowQuestionario(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowQuestionario(false);
  };

  const startQuestionario = () => {
    setShowQuestionario(true);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorias`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCategorias(data);
      } catch {
        setErro("Error fetching categories");
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setResultado(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remedios`);
      if (!res.ok) throw new Error("Error fetching teas");
      const data = await res.json();
      const cha = data.find(r => r.categoria_id === Number(categoria));
      setResultado(cha || null);
    } catch (err) {
      setErro("Could not find the recommended tea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnfeite = (id, value) => {
    setEnfeite(prev => ({ ...prev, [id]: value }));
  };

  const carouselContentStyle = {
    margin: 0,
    height: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #086047ff, #224040)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Avena Pharmacy 🌿</h1>
        <p>Your health comes first!</p>
      </div>
          <div className={styles.carouselContainer}>
            <Carousel
              arrows
              infinite={true}
              autoplay
              autoplaySpeed={4000}
              dotPosition="bottom"
            >
              <div>
                <h3 style={carouselContentStyle}>🌿Natural Remedies</h3>
              </div>
              <div>
                <h3 style={carouselContentStyle}>🍃 Medicinal Teas</h3>
              </div>
              <div>
                <h3 style={carouselContentStyle}>💚 Your Natural Health</h3>
              </div>
            </Carousel>
            <div className={styles.lojas}>
              <BuyCard
                link="https://www.rotulodobem.com.br/"
                place="Visit Rotulo do Bem"
              />
              <BuyCard
                link="https://www.farmaciavidanatural.com.br/"
                place="Visit Farmacia Vida Natural"
              />
            </div>
      <div className={styles.sectionNeed}>
        <SectionNeed 
          showTitle={true}
          categoryImages={{
            1: "/images/estresse.png",
            2: "/images/dor-abdominal.png", 
            3: "/images/dor-no-corpo.png",
            4: "/images/insonia.png",
            5: "/images/resfriado.png",
            6: "/images/dor-de-cabeca.png",
            7: "/images/colicas.png",
            8: "/images/dor-de-estomago.png",
            9: "/images/menopausa.png",
          }}
        />
        <div className={styles.text}>
          <p className={styles.question}>Need help choosing the right tea?</p>
          <p>Take our quick quiz and find the perfect tea for your health and well-being!</p>
        </div>
            <div className={styles.modalSection}>
              <Button type="primary" onClick={showModal} size="large">
                🌿 Personalized consultation
              </Button>
            </div>
      </div>

      </div>

      <Modal
        title="🌿 Personalized Tea Consultation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="Close"
        cancelText="Cancell"
        footer={null}
      >
        {!showQuestionario ? (
          <div className={styles.modalContent}>
            <p>Discover the ideal tea for you!</p>
            <p>Answer a few quick questions and find the perfect product for your health and well-being.</p>


            <div className={styles.modalButtons}>
              <Button type="primary" size="large" onClick={startQuestionario}>
                🚀 Start Questionnaire
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {!resultado && (
              <form
                onSubmit={handleSubmit}
                className={styles.form}>
                <div>
                  <p className={styles.perguntasEnfeite}>What are you feeling?</p>
                  <div className={styles.categorias}>
                    {categorias.map(cat => (
                      <label key={cat.id} style={{ cursor: "pointer", padding: "0.5rem 1rem", border: categoria == cat.id ? "2px solid #4D8C63" : "1px solid #ccc", borderRadius: 12, background: categoria == cat.id ? "#e6f4ea" : "#fff", fontWeight: 500 }}>
                        <input
                          type="radio"
                          name="categoria"
                          value={cat.id}
                          checked={categoria == cat.id}
                          onChange={() => setCategoria(cat.id)}
                          style={{ display: "none" }}
                        />
                        {cat.nome_categoria}
                      </label>
                    ))}
                  </div>
                </div>
                {perguntasEnfeite.map(perg => (
                  <div key={perg.id} style={{ marginBottom: "1.5rem" }}>
                    <strong style={{ display: "block", marginBottom: "0.8rem", color: "#4D8C63" }}>{perg.texto}</strong>
                    <div className={styles.enfeites}>
                      {perg.opcoes.map(op => (
                        <label key={op} className={styles.label + " " + (enfeite[perg.id] === op ? styles.enfeiteLabelSelecionada : "")}>
                          <input
                            type="radio"
                            name={perg.id}
                            value={op}
                            checked={enfeite[perg.id] === op}
                            onChange={() => handleEnfeite(perg.id, op)}
                            style={{ display: "none" }}
                          />
                          {op}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="submit" disabled={!categoria} className={styles.submitButton}>See recommended tea</button>
              </form>
            )}
            {loading && <p className={styles.loadingMessage}>Searching for recommended tea...</p>}
            {erro && <p className={styles.errorMessage}>{erro}</p>}
            {resultado && (
              <div className={styles.resultadoBox}>
                <h3 className={styles.resultTitle}>Recommended tea:</h3>
                <h4 className={styles.resultSubtitle}>{resultado.nome_remedio}</h4>
                {resultado.photo && (
                  <img
                    src={resultado.photo}
                    alt={resultado.nome_remedio}
                    width="200"
                    className={styles.resultImage}
                  />
                )}
                <p className={styles.resultText}><b>Effect:</b> {resultado.efeito_remedio}</p>
                <p className={styles.resultText}><b>Preparation method:</b> {resultado.modo_preparo}</p>
                <p className={styles.resultText}><b>Contraindications:</b> {resultado.contraindicacoes}</p>
                <button
                  className={styles.resetButton}
                  onClick={() => { setResultado(null); setCategoria(""); setEnfeite({}); }}
                >
                  Choose another tea
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}