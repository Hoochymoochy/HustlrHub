"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Shield, Users, Globe, Scale } from "lucide-react"
import { useState, useRef } from "react"

export default function LandingPage() {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const missionRef = useRef<HTMLDivElement | null>(null)

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f8fcff] to-[#eef7ff] text-slate-800">
      {/* Hero Section */}
      <section className="relative py-28 min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <img 
            src="/logo.png" 
            alt="LADINT Logo" 
            className="w-[22rem] h-[22rem] md:w-72 md:h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Liga Acadêmica de Direito Internacional
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 max-w-3xl leading-relaxed opacity-90">
          Promover o estudo crítico e interdisciplinar do Direito Internacional
          à luz dos desafios globais da atualidade.
          </p>
          <Button 
            onClick={scrollToMission}
            className="mt-6 px-10 py-4 bg-[#3eb4fb] hover:bg-[#1f9ce0] text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
          >
            Saber mais
          </Button>
        </div>
      </section>

      {/* Join Form Modal */} {isOpenForm && ( <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"> <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8"> <h3 className="text-xl font-bold mb-4">Torne-se um membro</h3> <p className="text-sm text-slate-500 mb-6">Junte-se à nossa comunidade e ajude a moldar o futuro do direito internacional.</p> <input className="w-full border p-2 rounded mb-3" placeholder="Endereço de email" type="email" /> <input className="w-full border p-2 rounded mb-6" placeholder="Número do WhatsApp" type="tel" /> <Button className="w-full bg-cyan-600 text-white">Enviar</Button> <Button variant="ghost" className="w-full mt-3" onClick={() => setIsOpenForm(false)}>Cancelar</Button> </div> </div> )}

      {/* Mission & Goals */}
      <section ref={missionRef} className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        <Card className="bg-white/80 shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cyan-700">Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 leading-relaxed">
          A International Law League capacita futuros juristas para enfrentar os desafios mais complexos da globalização — direitos humanos, diplomacia, mudanças climáticas e muito mais. Unimos pesquisa, debate e colaboração global para transformar complexidade em impacto, preparando estudantes para moldar o sistema jurídico brasileiro e o cenário mundial.          </CardContent>
        </Card>

        <Card className="bg-white/80 shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cyan-700">Our Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-700">
            <div className="flex items-center space-x-2"><Shield className="w-5 h-5 text-cyan-500" /> Organizar debates e seminários acadêmicos</div>
            <div className="flex items-center space-x-2"><Users className="w-5 h-5 text-purple-500" /> Conecte alunos com profissionais</div>
            <div className="flex items-center space-x-2"><Globe className="w-5 h-5 text-green-500" /> Promover a colaboração internacional</div>
            <div className="flex items-center space-x-2"><Scale className="w-5 h-5 text-blue-500" /> Incentivar a pesquisa e publicação jurídica</div>
          </CardContent>
        </Card>
      </section>

      {/* More About */}
      <section className="container mx-auto px-4 py-20 space-y-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Mais sobre o clube</h2>

        {[
          { title: "Escopo", content: "Nosso eixo? Direitos Humanos e Internacionais. Nosso playground? Direito Internacional, Direitos Humanos e Geopolítica. Exploramos como a globalização molda os arcabouços jurídicos atuais e os sistemas de justiça do futuro. 🌍⚖️" },
          { title: "Repercussão", content: "Por meio da colaboração, fomentamos a pesquisa e o debate sobre Direito Internacional, diplomacia, governança climática e todas as fronteiras onde o direito encontra as mudanças globais. Não estamos apenas observando o futuro se desenrolar — estamos escrevendo-o." },
          { title: "Objetivos", content: <ul className="list-disc list-inside space-y-2"><li>Estudar criticamente o Direito Internacional Público e Privado</li><li>Analisar o impacto da globalização na justiça</li><li>Organizar debates acadêmicos e publicar pesquisas</li><li>Capacitar os alunos para moldar o futuro jurídico</li></ul> },
          { title: "Linha de Pesquisa", content: <p><strong>Direito Internacional e Novos Desafios Globais: </strong> De conflitos geopolíticos a tratados sobre mudanças climáticas, dissecamos as estruturas jurídicas que moldam a sobrevivência global.</p> },
        ].map((item, i) => (
          <Card key={i} className="bg-white/80 shadow-lg border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cyan-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 leading-relaxed">{item.content}</CardContent>
          </Card>
        ))}
      </section>

      {/* Council */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Conheça o Conselho</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Mila Antunes", role: "Presidente", image: "/Mila-Antunes.jpg" },
            { name: "Letícia Belo", role: "Vice Presidente", image: "/Letícia-Belo.jpg" },
            { name: "Julia Bordalo", role: "Diretoria de Comunicação", image: "/Julia-Bordalo.jpg" },
            { name: "Akio José", role: "Diretoria de Eventos", image: "/Akio-José.jpg" },
            { name: "Brenno Fonseca", role: "Secretaria Geral", image: "/Brenno-Fonseca.jpg" },
            { name: "Giovana Duailibe", role: "Diretoria Científica", image: "/Giovana-Duailibe.jpg" }
          ].map((member, i) => (
            <Card key={i} className="text-center bg-white/80 shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
              <CardHeader>
                <Avatar className="mx-auto w-20 h-20 ring-4 ring-cyan-200 shadow-md">
                  <AvatarImage src={member.image} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-lg font-semibold text-gray-900">{member.name}</CardTitle>
                <CardDescription className="text-sm text-cyan-700 font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                {member.name} é apaixonado pela justiça global e pelo futuro do direito internacional.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Become a Member - Centerpiece */}
      <section className="container mx-auto px-4 py-24 flex justify-center">
        <Button 
          onClick={() => setIsOpenForm(true)} 
          className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          Torne-se um membro
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-4 text-center text-slate-500">
        Liga Acadêmica de Direito Internacional &copy; 2025
      </footer>
    </div>
  )
}
