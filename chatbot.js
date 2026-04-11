/**
 * CJ Chatbot AI - Asistente virtual inteligente para CJ Consultoría
 * Implementa respuestas basadas en palabras clave con contexto conversacional
 */

(function() {
    'use strict';

    // Configuración del chatbot
    const CONFIG = {
        botName: 'CJ Assistant',
        botAvatar: '🐺',
        userAvatar: '👤',
        primaryColor: '#2E7DE8',
        greetingDelay: 3000,
        typingDelay: 800
    };

    // Base de conocimientos del bot
    const KNOWLEDGE_BASE = [
        {
            keywords: ['hola', 'buenas', 'saludos', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches'],
            responses: [
                '¡Hola! Soy CJ Assistant, el asistente virtual de CJ Consultoría. ¿En qué puedo ayudarte hoy? 🐺',
                '¡Bienvenido! Estoy aquí para resolver tus dudas sobre nuestros servicios de consultoría.',
                '¡Hola! ¿Buscas mejorar tus procesos de negocio? Cuéntame sobre tu empresa.'
            ],
            context: 'greeting'
        },
        {
            keywords: ['precio', 'costo', 'cuanto cuesta', 'cuanto vale', 'tarifa', 'cotizar', 'cotización'],
            responses: [
                'Nuestros servicios tienen diferentes rangos de inversión:\n\n• Control de Inventarios: Desde $8,000 MXN\n• Dashboard de Producción: Desde $5,000 MXN\n• StockWolf ERP: Desde $12,000 MXN\n• Procesos y Manuales: Desde $8,000 MXN\n• ISO 9001:2015: Desde $25,000 MXN\n\n¿Te gustaría una cotización personalizada para tu empresa?',
                'Los precios varían según el tamaño de tu empresa y complejidad. ¿Quieres que te contacte un consultor para una cotización a tu medida?',
                'Ofrecemos diagnósticos gratuitos de 30 minutos donde evaluamos tus necesidades y damos un presupuesto exacto. ¿Te interesa agendar uno? 📅'
            ],
            context: 'pricing'
        },
        {
            keywords: ['servicios', 'que hacen', 'que ofrecen', 'ayuda', 'soluciones'],
            responses: [
                'En CJ Consultoría ofrecemos:\n\n🏭 Manufactura: Control de mermas, eficiencia, ISO 9001\n🛒 Retail: Inventarios, puntos de venta, análisis de ventas\n📦 Logística: Bodegas, rutas, trazabilidad\n\n¿De qué industria se trata tu empresa?',
                'Nuestros servicios principales son:\n\n1. Control de Inventarios y Producción\n2. Sistemas de Gestión (StockWolf)\n3. Procesos y Manuales de Operación\n4. Certificación ISO 9001:2015\n5. Capacitación de personal\n\n¿Cuál te interesa?'
            ],
            context: 'services'
        },
        {
            keywords: ['manufactura', 'fabrica', 'producción', 'mermas', 'ineficiencia', 'fábrica'],
            responses: [
                'En manufactura resolvemos:\n\n✓ Mermas de producción (reducción hasta 65%)\n✓ Tiempos muertos en máquinas\n✓ Inventario descontrolado\n✓ Entregas tardías\n✓ Costos ocultos\n\nTenemos casos de éxito en León y Celaya. ¿Quieres verlos?',
                'Para fábricas y manufactura ofrecemos:\n• Dashboard de producción en tiempo real\n• Control de mermas con análisis de causas\n• Procesos estandarizados (ISO 9001)\n\n¿Tu fábrica está en León, Celaya o alrededores?'
            ],
            context: 'manufacturing'
        },
        {
            keywords: ['retail', 'tienda', 'comercio', 'inventario', 'ventas', 'boutique', 'stock'],
            responses: [
                'Para retail y comercios resolvemos:\n\n📦 Falta de stock sin aviso\n💰 Dinero congelado en productos que no se mueven\n😤 Clientes molestos por promesas incumplidas\n⏰ Inventarios físicos que toman días\n📊 Compras a ciegas sin datos\n\n¿Cuál de estos problemas tienes?',
                'Ayudamos a tiendas con:\n• Sistema de control de inventario en tiempo real\n• Alertas de stock mínimo\n• Análisis ABC de rotación\n• Dashboard de ventas por producto\n\n¿Tienes una tienda física o en línea?'
            ],
            context: 'retail'
        },
        {
            keywords: ['logistica', 'bodega', 'almacen', 'transporte', 'rutas', 'distribución', 'almacén'],
            responses: [
                'En logística optimizamos:\n\n🏭 Layout de bodega (hasta +35% eficiencia de espacio)\n🚚 Rutas de distribución (-40% en costos)\n📦 Sistemas WMS de trazabilidad\n⏱️ Tiempos de picking (-60%)\n🎯 Precisión de envíos (99.5%)\n\n¿Dónde está ubicada tu bodega?',
                'Para empresas de logística ofrecemos:\n• Diseño y reorganización de almacén\n• Sistema de ubicaciones optimizado\n• Control de entrada/salida de mercancía\n• Trazabilidad en tiempo real\n\n¿Cuántos m² tiene tu bodega?'
            ],
            context: 'logistics'
        },
        {
            keywords: ['iso', 'certificación', '9001', 'calidad', 'norma iso'],
            responses: [
                'La certificación ISO 9001:2015 te permite:\n\n✓ Competir por contratos grandes\n✓ Mejorar procesos y reducir errores\n✓ Dar confianza a tus clientes\n✓ Acceder a mercados internacionales\n\nTe acompañamos desde el diagnóstico hasta la certificación. ¿Estás interesado?',
                'Implementamos ISO 9001:2015 en empresas de León, Celaya y Guanajuato.\n\nProceso:\n1. Diagnóstico gratuito\n2. Diseño del sistema\n3. Capacitación\n4. Auditoría interna\n5. Certificación\n\nDesde $25,000 MXN según tamaño. ¿Quieres más información?'
            ],
            context: 'iso'
        },
        {
            keywords: ['contacto', 'whatsapp', 'llamar', 'teléfono', 'email', 'correo', 'hablar'],
            responses: [
                'Puedes contactarnos por:\n\n📱 WhatsApp: +52 477 694 0272\n✉️ Email: cj.consultoria.sgc@gmail.com\n📍 Ubicación: León, Guanajuato\n\nTambién puedes agendar un diagnóstico gratuito de 30 minutos. ¿Te gustaría?',
                'Estamos disponibles de lunes a viernes de 9:00 a 18:00 hrs.\n\nHaz clic en el botón verde de WhatsApp o escríbenos a cj.consultoria.sgc@gmail.com\n\n¿Prefieres que te contactemos nosotros?'
            ],
            context: 'contact'
        },
        {
            keywords: ['casos', 'ejemplos', 'clientes', 'testimonios', 'resultados', 'éxito'],
            responses: [
                'Algunos de nuestros casos de éxito:\n\n🏭 Mueblería Caoba: -65% en mermas, ahorro de $180k anuales\n📦 DistriMuebles: 100% precisión de inventario, -$540k en pérdidas\n🎨 ADIS Diseño: -95% en tiempo de reportes, +40% rentabilidad\n\n¿Quieres ver los casos completos? Visita: /casos.html',
                'Nuestros clientes han logrado resultados medibles:\n• Reducción de mermas hasta 65%\n• Ahorro promedio de $180,000 al año\n• 100% precisión en inventarios\n• Tiempos de entrega -40%\n\n¿Quieres ser el próximo caso de éxito?'
            ],
            context: 'cases'
        },
        {
            keywords: ['stockwolf', 'erp', 'sistema', 'software', 'aplicación', 'app'],
            responses: [
                'StockWolf es nuestro sistema de gestión desarrollado para empresas de León y Celaya.\n\nIncluye:\n📊 Dashboard en tiempo real\n📦 Control de inventarios\n👥 Gestión de usuarios\n📱 Acceso desde celular\n📈 Reportes automáticos\n\nDesde $12,000 MXN con implementación incluida.',
                'StockWolf ERP te permite:\n✓ Ver tu inventario desde cualquier lugar\n✓ Controlar quién hace qué\n✓ Generar reportes automáticos\n✓ Alertas cuando stock baja\n\n¿Te gustaría una demostración?'
            ],
            context: 'stockwolf'
        },
        {
            keywords: ['ubicación', 'donde están', 'dirección', 'leon', 'celaya', 'guanajuato', 'local'],
            responses: [
                'Estamos ubicados en León, Guanajuato, pero atendemos empresas de:\n\n📍 León\n📍 Celaya\n📍 Irapuato\n📍 Salamanca\n📍 Silao\n📍 Guanajuato capital\n\nOfrecemos visitas presenciales a tu empresa. ¿Dónde te encuentras?',
                'CJ Consultoría es 100% local, de León para León.\n\nConocemos las industrias de la región y sus retos específicos.\n\n¿Tu empresa está en alguna de estas ciudades?'
            ],
            context: 'location'
        },
        {
            keywords: ['tiempo', 'cuanto tarda', 'duración', 'cuando', 'plazo', 'implementación'],
            responses: [
                'Los tiempos dependen del servicio:\n\n• Dashboards: 1-2 semanas\n• Control de inventarios: 2-4 semanas\n• Procesos y manuales: 2-4 semanas\n• StockWolf ERP: 1-2 meses\n• ISO 9001:2015: 3-6 meses\n\n¿Te urge algún proyecto en particular?',
                'Trabajamos con cronogramas definidos.\n\nEl diagnóstico gratuito es de 30 minutos y te damos un plan con tiempos reales.\n\n¿Quieres agendar uno? 📅'
            ],
            context: 'timing'
        },
        {
            keywords: ['gratis', 'gratuito', 'diagnóstico', 'demo', 'prueba', 'muestra'],
            responses: [
                '¡Sí! Ofrecemos diagnóstico gratuito de 30 minutos.\n\nEn la reunión evaluamos:\n✓ Tu situación actual\n✓ Problemas principales\n✓ Oportunidades de mejora\n✓ Propuesta de solución\n✓ Inversión estimada\n\nSin compromiso. ¿Te gustaría agendar?',
                'El diagnóstico gratuito incluye:\n• Visita a tu empresa (o videollamada)\n• Análisis de procesos actuales\n• Identificación de pérdidas\n• Propuesta personalizada\n\nAgenda aquí: /cotizacion.html'
            ],
            context: 'free'
        },
        {
            keywords: ['adios', 'chao', 'hasta luego', 'nos vemos', 'gracias', 'bye'],
            responses: [
                '¡Gracias por contactarnos! 🐺\n\nSi tienes más dudas, aquí estaré. O si prefieres hablar con un consultor:\n\n📱 +52 477 694 0272\n✉️ cj.consultoria.sgc@gmail.com\n\n¡Que tengas excelente día!',
                '¡Ha sido un placer! Recuerda que ofrecemos diagnóstico gratuito.\n\nHaz clic en el botón de WhatsApp verde cuando quieras. ¡Hasta pronto! 👋'
            ],
            context: 'goodbye'
        }
    ];

    // Respuestas por defecto cuando no se reconoce la intención
    const DEFAULT_RESPONSES = [
        'Interesante. ¿Podrías darme más detalles? Así puedo ayudarte mejor. 🐺',
        'Entiendo. ¿Se trata de una empresa de manufactura, retail o logística?',
        'Cuéntame más sobre tu empresa. ¿Cuántos empleados tienen y en qué ciudad están?',
        'Para ayudarte mejor, ¿qué problema específico estás enfrentando actualmente?',
        'Parece importante. ¿Te gustaría agendar un diagnóstico gratuito de 30 minutos con uno de nuestros consultores?',
        'No estoy seguro de entender completamente. ¿Prefieres que te contacte un consultor humano? Escríbenos a cj.consultoria.sgc@gmail.com o WhatsApp: +52 477 694 0272'
    ];

    // Estado del chat
    let chatState = {
        isOpen: false,
        hasGreeted: false,
        messageHistory: [],
        context: null,
        lastInteraction: Date.now()
    };

    // Crear elementos del chatbot
    function createChatbotElements() {
        const chatbotHTML = `
            <div id="cj-chatbot" class="cj-chatbot-container">
                <!-- Botón flotante -->
                <button id="cj-chatbot-toggle" class="cj-chatbot-toggle" aria-label="Abrir chat">
                    <span class="cj-chatbot-toggle-icon">🐺</span>
                    <span class="cj-chatbot-notification"></span>
                </button>
                
                <!-- Ventana del chat -->
                <div id="cj-chatbot-window" class="cj-chatbot-window">
                    <!-- Header -->
                    <div class="cj-chatbot-header">
                        <div class="cj-chatbot-avatar">
                            <span>${CONFIG.botAvatar}</span>
                        </div>
                        <div class="cj-chatbot-info">
                            <h3 class="cj-chatbot-name">${CONFIG.botName}</h3>
                            <span class="cj-chatbot-status">● En línea</span>
                        </div>
                        <button id="cj-chatbot-close" class="cj-chatbot-close" aria-label="Cerrar chat">✕</button>
                    </div>
                    
                    <!-- Mensajes -->
                    <div id="cj-chatbot-messages" class="cj-chatbot-messages">
                        <div class="cj-chatbot-message cj-chatbot-message-bot">
                            <div class="cj-chatbot-message-avatar">${CONFIG.botAvatar}</div>
                            <div class="cj-chatbot-message-content">
                                <p>¡Hola! Soy CJ Assistant 🐺</p>
                                <p>Estoy aquí para ayudarte con información sobre nuestros servicios de consultoría.</p>
                            </div>
                        </div>
                        
                        <!-- Opciones rápidas -->
                        <div class="cj-chatbot-quick-replies">
                            <button class="cj-chatbot-quick-btn" data-message="¿Cuáles son sus servicios?">💼 Servicios</button>
                            <button class="cj-chatbot-quick-btn" data-message="¿Cuánto cuesta?">💰 Precios</button>
                            <button class="cj-chatbot-quick-btn" data-message="¿Tienen casos de éxito?">📊 Casos</button>
                            <button class="cj-chatbot-quick-btn" data-message="Quiero una cotización">📝 Cotizar</button>
                        </div>
                    </div>
                    
                    <!-- Input -->
                    <div class="cj-chatbot-input-container">
                        <input 
                            type="text" 
                            id="cj-chatbot-input" 
                            class="cj-chatbot-input" 
                            placeholder="Escribe tu mensaje..."
                            autocomplete="off"
                        >
                        <button id="cj-chatbot-send" class="cj-chatbot-send" aria-label="Enviar mensaje">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const styles = `
            <style>
                .cj-chatbot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: 'Open Sans', sans-serif;
                }
                
                @media (max-width: 768px) {
                    .cj-chatbot-container {
                        bottom: 80px;
                        right: 10px;
                    }
                }
                
                /* Botón flotante */
                .cj-chatbot-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${CONFIG.primaryColor}, #00D4FF);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(46, 125, 232, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .cj-chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 30px rgba(46, 125, 232, 0.6);
                }
                
                .cj-chatbot-toggle-icon {
                    font-size: 28px;
                    animation: pulse-wolf 2s ease-in-out infinite;
                }
                
                @keyframes pulse-wolf {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .cj-chatbot-notification {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 14px;
                    height: 14px;
                    background: #EF4444;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: pulse-notification 2s infinite;
                    display: none;
                }
                
                @keyframes pulse-notification {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
                
                /* Ventana del chat */
                .cj-chatbot-window {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    width: 360px;
                    max-height: 500px;
                    background: rgba(11, 31, 58, 0.98);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    border: 1px solid rgba(46, 125, 232, 0.3);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .cj-chatbot-window.open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                @media (max-width: 480px) {
                    .cj-chatbot-window {
                        width: calc(100vw - 20px);
                        right: -10px;
                        max-height: 70vh;
                    }
                }
                
                /* Header */
                .cj-chatbot-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: linear-gradient(135deg, rgba(46, 125, 232, 0.2), rgba(0, 212, 255, 0.1));
                    border-bottom: 1px solid rgba(46, 125, 232, 0.2);
                }
                
                .cj-chatbot-avatar {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, ${CONFIG.primaryColor}, #00D4FF);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }
                
                .cj-chatbot-info {
                    flex: 1;
                }
                
                .cj-chatbot-name {
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    font-size: 16px;
                    color: white;
                    margin: 0;
                }
                
                .cj-chatbot-status {
                    font-size: 12px;
                    color: #10B981;
                }
                
                .cj-chatbot-close {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .cj-chatbot-close:hover {
                    background: rgba(239, 68, 68, 0.3);
                }
                
                /* Mensajes */
                .cj-chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-height: 350px;
                }
                
                .cj-chatbot-messages::-webkit-scrollbar {
                    width: 6px;
                }
                
                .cj-chatbot-messages::-webkit-scrollbar-thumb {
                    background: rgba(46, 125, 232, 0.5);
                    border-radius: 3px;
                }
                
                .cj-chatbot-message {
                    display: flex;
                    gap: 10px;
                    animation: message-appear 0.3s ease;
                }
                
                @keyframes message-appear {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .cj-chatbot-message-user {
                    flex-direction: row-reverse;
                }
                
                .cj-chatbot-message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${CONFIG.primaryColor}, #00D4FF);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    flex-shrink: 0;
                }
                
                .cj-chatbot-message-user .cj-chatbot-message-avatar {
                    background: rgba(192, 192, 192, 0.3);
                }
                
                .cj-chatbot-message-content {
                    background: rgba(46, 125, 232, 0.15);
                    border: 1px solid rgba(46, 125, 232, 0.2);
                    border-radius: 16px;
                    padding: 12px 16px;
                    max-width: 75%;
                    color: white;
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: pre-line;
                }
                
                .cj-chatbot-message-user .cj-chatbot-message-content {
                    background: linear-gradient(135deg, ${CONFIG.primaryColor}, #00D4FF);
                    border: none;
                }
                
                .cj-chatbot-message-content p {
                    margin: 0 0 8px 0;
                }
                
                .cj-chatbot-message-content p:last-child {
                    margin-bottom: 0;
                }
                
                /* Indicador de escritura */
                .cj-chatbot-typing {
                    display: flex;
                    gap: 4px;
                    padding: 16px 20px;
                }
                
                .cj-chatbot-typing-dot {
                    width: 8px;
                    height: 8px;
                    background: ${CONFIG.primaryColor};
                    border-radius: 50%;
                    animation: typing-dot 1.4s infinite ease-in-out both;
                }
                
                .cj-chatbot-typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .cj-chatbot-typing-dot:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typing-dot {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
                
                /* Opciones rápidas */
                .cj-chatbot-quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding-top: 8px;
                }
                
                .cj-chatbot-quick-btn {
                    padding: 8px 14px;
                    background: rgba(46, 125, 232, 0.2);
                    border: 1px solid rgba(46, 125, 232, 0.3);
                    border-radius: 20px;
                    color: white;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .cj-chatbot-quick-btn:hover {
                    background: ${CONFIG.primaryColor};
                    transform: translateY(-2px);
                }
                
                /* Input */
                .cj-chatbot-input-container {
                    display: flex;
                    gap: 8px;
                    padding: 12px 16px;
                    border-top: 1px solid rgba(46, 125, 232, 0.2);
                    background: rgba(11, 31, 58, 0.8);
                }
                
                .cj-chatbot-input {
                    flex: 1;
                    padding: 12px 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(46, 125, 232, 0.3);
                    border-radius: 24px;
                    color: white;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.2s;
                }
                
                .cj-chatbot-input::placeholder {
                    color: rgba(192, 192, 192, 0.7);
                }
                
                .cj-chatbot-input:focus {
                    border-color: ${CONFIG.primaryColor};
                    background: rgba(255, 255, 255, 0.15);
                }
                
                .cj-chatbot-send {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${CONFIG.primaryColor}, #00D4FF);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all 0.2s;
                }
                
                .cj-chatbot-send:hover {
                    transform: scale(1.1);
                }
                
                .cj-chatbot-send svg {
                    width: 20px;
                    height: 20px;
                }
            </style>
        `;

        // Insertar HTML y estilos
        const container = document.createElement('div');
        container.innerHTML = chatbotHTML + styles;
        document.body.appendChild(container);
    }

    // Encontrar la mejor respuesta basada en palabras clave
    function findBestResponse(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Buscar coincidencias
        for (const item of KNOWLEDGE_BASE) {
            for (const keyword of item.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    // Seleccionar respuesta aleatoria de las opciones
                    const response = item.responses[Math.floor(Math.random() * item.responses.length)];
                    chatState.context = item.context;
                    return response;
                }
            }
        }
        
        // Si no hay coincidencia, usar respuesta por defecto
        const defaultResponse = DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
        return defaultResponse;
    }

    // Mostrar indicador de escritura
    function showTyping() {
        const messagesContainer = document.getElementById('cj-chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'cj-chatbot-typing';
        typingDiv.className = 'cj-chatbot-message cj-chatbot-message-bot';
        typingDiv.innerHTML = `
            <div class="cj-chatbot-message-avatar">${CONFIG.botAvatar}</div>
            <div class="cj-chatbot-message-content cj-chatbot-typing">
                <div class="cj-chatbot-typing-dot"></div>
                <div class="cj-chatbot-typing-dot"></div>
                <div class="cj-chatbot-typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Ocultar indicador de escritura
    function hideTyping() {
        const typing = document.getElementById('cj-chatbot-typing');
        if (typing) typing.remove();
    }

    // Agregar mensaje del bot
    function addBotMessage(text) {
        const messagesContainer = document.getElementById('cj-chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'cj-chatbot-message cj-chatbot-message-bot';
        messageDiv.innerHTML = `
            <div class="cj-chatbot-message-avatar">${CONFIG.botAvatar}</div>
            <div class="cj-chatbot-message-content">
                <p>${text.replace(/\n/g, '</p><p>')}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Agregar mensaje del usuario
    function addUserMessage(text) {
        const messagesContainer = document.getElementById('cj-chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'cj-chatbot-message cj-chatbot-message-user';
        messageDiv.innerHTML = `
            <div class="cj-chatbot-message-avatar">${CONFIG.userAvatar}</div>
            <div class="cj-chatbot-message-content">
                <p>${text}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Procesar mensaje del usuario
    function processUserMessage(message) {
        if (!message.trim()) return;
        
        // Agregar mensaje del usuario
        addUserMessage(message);
        
        // Guardar en historial
        chatState.messageHistory.push({ role: 'user', message });
        chatState.lastInteraction = Date.now();
        
        // Mostrar indicador de escritura
        showTyping();
        
        // Simular tiempo de respuesta
        const delay = CONFIG.typingDelay + Math.random() * 500;
        
        setTimeout(() => {
            hideTyping();
            const response = findBestResponse(message);
            addBotMessage(response);
            chatState.messageHistory.push({ role: 'bot', message: response });
        }, delay);
    }

    // Saludo automático después de un tiempo
    function scheduleGreeting() {
        setTimeout(() => {
            if (!chatState.isOpen && !chatState.hasGreeted) {
                const notification = document.querySelector('.cj-chatbot-notification');
                if (notification) {
                    notification.style.display = 'block';
                    
                    // Mostrar saludo cuando abren
                    const toggle = document.getElementById('cj-chatbot-toggle');
                    const greetingHandler = () => {
                        if (!chatState.hasGreeted) {
                            setTimeout(() => {
                                addBotMessage('¿Tienes alguna duda sobre nuestros servicios? Estoy aquí para ayudarte. 😊');
                                chatState.hasGreeted = true;
                            }, 500);
                            toggle.removeEventListener('click', greetingHandler);
                        }
                    };
                    toggle.addEventListener('click', greetingHandler);
                }
            }
        }, CONFIG.greetingDelay);
    }

    // Toggle del chat
    function toggleChat() {
        const window = document.getElementById('cj-chatbot-window');
        const notification = document.querySelector('.cj-chatbot-notification');
        
        chatState.isOpen = !chatState.isOpen;
        
        if (chatState.isOpen) {
            window.classList.add('open');
            if (notification) notification.style.display = 'none';
            document.getElementById('cj-chatbot-input')?.focus();
        } else {
            window.classList.remove('open');
        }
    }

    // Inicializar eventos
    function initEvents() {
        // Toggle
        document.getElementById('cj-chatbot-toggle').addEventListener('click', toggleChat);
        
        // Cerrar
        document.getElementById('cj-chatbot-close').addEventListener('click', toggleChat);
        
        // Enviar mensaje
        const sendBtn = document.getElementById('cj-chatbot-send');
        const input = document.getElementById('cj-chatbot-input');
        
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                processUserMessage(message);
                input.value = '';
            }
        };
        
        sendBtn.addEventListener('click', sendMessage);
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Botones de opciones rápidas
        document.querySelectorAll('.cj-chatbot-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                processUserMessage(message);
            });
        });
        
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            const chatbot = document.getElementById('cj-chatbot');
            if (chatState.isOpen && !chatbot.contains(e.target)) {
                toggleChat();
            }
        });
    }

    // Inicializar chatbot
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createChatbotElements();
                initEvents();
                scheduleGreeting();
            });
        } else {
            createChatbotElements();
            initEvents();
            scheduleGreeting();
        }
    }

    // Exponer API global
    window.CJChatbot = {
        init,
        open: () => {
            if (!chatState.isOpen) toggleChat();
        },
        close: () => {
            if (chatState.isOpen) toggleChat();
        },
        sendMessage: processUserMessage
    };

    // Auto-inicializar
    init();
})();
