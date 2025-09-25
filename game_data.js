const gameData = {
  organs: [
    {
      id: 'boca',
      name: 'Boca',
      description: 'A digestão começa aqui! A mastigação tritura o alimento e a saliva, rica em amilase salivar, inicia a quebra dos carboidratos complexos em açúcares mais simples.',
      enzymes: ['Amilase Salivar'],
      next_organ_options: ['faringe'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Qual enzima presente na saliva inicia a digestão dos carboidratos?',
          options: ['Pepsina', 'Amilase Salivar', 'Lipase', 'Tripsina'],
          correct_answer: 'Amilase Salivar',
          explanation: 'A amilase salivar, também conhecida como ptialina, é a primeira enzima a agir sobre os carboidratos, iniciando sua quebra já na boca.'
        },
        {
          type: 'multiple_choice',
          text: 'Qual o principal processo mecânico que ocorre na boca?',
          options: ['Deglutição', 'Peristaltismo', 'Mastigação', 'Absorção'],
          correct_answer: 'Mastigação',
          explanation: 'A mastigação é o processo mecânico de triturar o alimento, aumentando sua superfície de contato para a ação das enzimas.'
        }
      ]
    },
    {
      id: 'faringe',
      name: 'Faringe',
      description: 'A faringe é um canal muscular que serve como passagem tanto para o ar quanto para o alimento. Durante a deglutição, a epiglote impede que o alimento vá para as vias respiratórias.',
      next_organ_options: ['esofago'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Qual o processo de transporte do alimento da faringe para o esôfago?',
          options: ['Mastigação', 'Peristaltismo', 'Deglutição', 'Absorção'],
          correct_answer: 'Deglutição',
          explanation: 'A deglutição é o ato de engolir, que move o alimento da boca para a faringe e, em seguida, para o esôfago.'
        },
        {
          type: 'multiple_choice',
          text: 'Qual estrutura impede que o alimento entre nas vias respiratórias durante a deglutição?',
          options: ['Laringe', 'Epiglote', 'Traqueia', 'Esôfago'],
          correct_answer: 'Epiglote',
          explanation: 'A epiglote é uma pequena aba de cartilagem que se fecha sobre a laringe durante a deglutição, direcionando o alimento para o esôfago.'
        }
      ]
    },
    {
      id: 'esofago',
      name: 'Esôfago',
      description: 'O esôfago é um tubo muscular que conecta a faringe ao estômago. O alimento é impulsionado por ondas de contração muscular chamadas peristaltismo, independentemente da gravidade.',
      next_organ_options: ['estomago'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Como o alimento se move através do esôfago?',
          options: ['Por gravidade', 'Por movimentos peristálticos', 'Por absorção', 'Por difusão'],
          correct_answer: 'Por movimentos peristálticos',
          explanation: 'O peristaltismo são contrações musculares rítmicas que empurram o bolo alimentar ao longo do trato digestório.'
        },
        {
          type: 'multiple_choice',
          text: 'Qual a principal função do esôfago?',
          options: ['Digerir proteínas', 'Absorver nutrientes', 'Transportar alimento', 'Produzir enzimas'],
          correct_answer: 'Transportar alimento',
          explanation: 'A principal função do esôfago é conduzir o alimento da faringe até o estômago através do peristaltismo.'
        }
      ]
    },
    {
      id: 'estomago',
      name: 'Estômago',
      description: 'No estômago, o alimento é misturado com o suco gástrico, que contém ácido clorídrico (HCl) e a enzima pepsina. O HCl ativa a pepsina e mata bactérias, enquanto a pepsina inicia a quebra das proteínas, formando o quimo.',
      enzymes: ['Pepsina', 'Ácido Clorídrico (HCl)'],
      next_organ_options: ['intestino_delgado'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Qual substância no estômago é responsável por quebrar as proteínas?',
          options: ['Amilase', 'Bile', 'Pepsina', 'Lipase'],
          correct_answer: 'Pepsina',
          explanation: 'A pepsina é uma enzima proteolítica que atua em ambiente ácido, quebrando proteínas em peptídeos menores.'
        },
        {
          type: 'multiple_choice',
          text: 'Qual a função do Ácido Clorídrico (HCl) no estômago?',
          options: ['Neutralizar o pH', 'Ativar a pepsina e matar bactérias', 'Digerir carboidratos', 'Absorver água'],
          correct_answer: 'Ativar a pepsina e matar bactérias',
          explanation: 'O HCl cria um ambiente ácido ideal para a pepsina e atua como uma barreira contra microrganismos.'
        }
      ]
    },
    {
      id: 'intestino_delgado',
      name: 'Intestino Delgado',
      description: 'Dividido em duodeno, jejuno e íleo. É o principal local de digestão e absorção de nutrientes. Recebe a bile (do fígado/vesícula biliar) para emulsificar gorduras e o suco pancreático (do pâncreas) com enzimas para digerir carboidratos, proteínas e gorduras. As vilosidades aumentam a área de absorção.',
      enzymes: ['Bile', 'Suco Pancreático', 'Amilase Pancreática', 'Tripsina', 'Lipase Pancreática'],
      next_organ_options: ['intestino_grosso'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Onde ocorre a maior parte da absorção de nutrientes?',
          options: ['Estômago', 'Intestino Grosso', 'Intestino Delgado', 'Esôfago'],
          correct_answer: 'Intestino Delgado',
          explanation: 'O intestino delgado possui vilosidades e microvilosidades que aumentam enormemente a superfície de contato para a absorção eficiente dos nutrientes.'
        },
        {
          type: 'multiple_choice',
          text: 'Qual a função da bile no intestino delgado?',
          options: ['Digerir proteínas', 'Emulsificar gorduras', 'Quebrar carboidratos', 'Absorver água'],
          correct_answer: 'Emulsificar gorduras',
          explanation: 'A bile, produzida pelo fígado e armazenada na vesícula biliar, quebra grandes glóbulos de gordura em menores, facilitando a ação da lipase.'
        }
      ]
    },
    {
      id: 'intestino_grosso',
      name: 'Intestino Grosso',
      description: 'Responsável pela absorção de água, sais minerais e algumas vitaminas produzidas pela flora bacteriana. O material não digerido se solidifica, formando as fezes.',
      next_organ_options: ['anus'],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Qual a principal função do intestino grosso?',
          options: ['Quebrar proteínas', 'Absorver nutrientes', 'Absorver água e formar fezes', 'Produzir bile'],
          correct_answer: 'Absorver água e formar fezes',
          explanation: 'No intestino grosso, a água é reabsorvida do quimo, transformando-o em fezes sólidas que serão eliminadas.'
        },
        {
          type: 'multiple_choice',
          text: 'O que a flora bacteriana do intestino grosso ajuda a produzir?',
          options: ['Ácido clorídrico', 'Bile', 'Vitaminas (como K e B)', 'Pepsina'],
          correct_answer: 'Vitaminas (como K e B)',
          explanation: 'As bactérias benéficas no intestino grosso fermentam fibras e produzem vitaminas essenciais, como a K e algumas do complexo B.'
        }
      ]
    },
    {
      id: 'anus',
      name: 'Ânus',
      description: 'O final da jornada! O ânus é a abertura pela qual as fezes são eliminadas do corpo, um processo controlado por esfíncteres musculares.',
      next_organ_options: [],
      questions: [
        {
          type: 'multiple_choice',
          text: 'Qual a função do ânus no sistema digestório?',
          options: ['Absorver nutrientes', 'Produzir enzimas', 'Eliminar fezes', 'Armazenar alimentos'],
          correct_answer: 'Eliminar fezes',
          explanation: 'O ânus é o ponto final do trato digestório, responsável pela defecação, que é a eliminação das fezes.'
        },
        {
          type: 'multiple_choice',
          text: 'O que controla a eliminação das fezes pelo ânus?',
          options: ['Vilosidades', 'Glândulas', 'Esfíncteres musculares', 'Peristaltismo'],
          correct_answer: 'Esfíncteres musculares',
          explanation: 'Os esfíncteres anais são músculos que controlam voluntariamente e involuntariamente a saída das fezes.'
        }
      ]
    }
  ],
  glands: [
    {
      id: 'salivares',
      name: 'Glândulas Salivares',
      description: 'Produzem saliva, que contém amilase salivar para iniciar a digestão de carboidratos e umedecer o alimento, facilitando a deglutição.',
      produces: ['Saliva', 'Amilase Salivar']
    },
    {
      id: 'figado_vesicula',
      name: 'Fígado e Vesícula Biliar',
      description: 'O fígado produz a bile, um líquido que ajuda na digestão de gorduras. A bile é armazenada e concentrada na vesícula biliar antes de ser liberada no intestino delgado.',
      produces: ['Bile']
    },
    {
      id: 'pancreas',
      name: 'Pâncreas',
      description: 'Produz suco pancreático, rico em enzimas digestivas (amilase, tripsina, lipase) para digerir carboidratos, proteínas e gorduras no intestino delgado, além de hormônios como insulina e glucagon.',
      produces: ['Suco Pancreático', 'Amilase Pancreática', 'Tripsina', 'Lipase Pancreática']
    }
  ]
};

