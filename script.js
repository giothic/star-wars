// StarWars IIFE
StarWars = (function() {

    /* 
     * Constructor
     */
    function StarWars(args) {
        // Context wrapper
        this.el = $(args.el);
        
        // Audio to play the opening crawl
        this.audio = this.el.find('audio').get(0);
        
        // Start the animation
        this.start = this.el.find('.start');
        
        // The animation wrapper
        this.animation = this.el.find('.animation');
        
        // Remove animation and show the start screen
        this.reset();

        // Start the animation on click
        this.start.bind('click', $.proxy(function() {
            this.start.hide();
            this.audio.play();
            this.el.append(this.animation);
        }, this));
        
        // Reset the animation and show the start screen
        $(this.audio).bind('ended', $.proxy(function() {
            this.audio.currentTime = 0;
            this.reset();
        }, this));
    }
    
    /*
     * Resets the animation and shows the start screen.
     */
    StarWars.prototype.reset = function() {
        this.start.show();
        this.cloned = this.animation.clone(true);
        this.animation.remove();
        this.animation = this.cloned;
    };

    return StarWars;
})();

// Inicializa o StarWars
const intro = new StarWars({
    el: '.starwars'
});

// Função para criar estrelas
$(document).ready(function() {
    const audio = $('audio')[0];
    const startSection = $('.start');

    // Event listener para o botão de início
    $('.start button').on('click', function() {
        audio.play();
        console.log("Áudio iniciado");
        startSection.hide();
    });

    // Função para criar estrelas
    function createStars(numStars) {
        const starfield = $('.starfield');
        for (let i = 0; i < numStars; i++) {
            const star = $('<div class="star"></div>');
            const size = Math.random() * 3 + 1; // Tamanho aleatório
            const left = Math.random() * 100; // Posição horizontal aleatória
            const duration = Math.random() * 2 + 3; // Duração aleatória

            star.css({
                width: `${size}px`, // Use crase aqui
                height: `${size}px`, // E aqui
                left: `${left}vw`, // E aqui
                animationDuration: `${duration}s`, // E aqui
                animationName: 'rise',
            });

            starfield.append(star);
        }
    }

    createStars(100); // Cria 100 estrelas
});
