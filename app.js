new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
        },
        atacar: function () {
            const DANIO_MIN_JUGADOR = 3
            const DANIO_MAX_JUGADOR = 10
        
            let danio = this.calcularHeridas(DANIO_MIN_JUGADOR,DANIO_MAX_JUGADOR)
            this.saludMonstruo -= danio

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea al monstruo por ${danio}`
            })

            if (this.verificarGanador()) {
                return
            }

            this.ataqueDelMonstruo()

        },

        ataqueEspecial: function () {
            const DANIO_MIN_JUGADOR = 10
            const DANIO_MAX_JUGADOR = 20

            let danio = this.calcularHeridas(DANIO_MIN_JUGADOR,DANIO_MAX_JUGADOR)
            this.saludMonstruo -= danio

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea con ataque especial al monstruo por ${danio}`
            })

            if (this.verificarGanador()) {
                return
            }
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10
            } else {
                this.saludJugador = 100
            }

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador se ha curado llevando su salud a ${this.saludJugador}`
            })
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
            this.turnos = []
        },

        ataqueDelMonstruo: function () {
            const DANIO_MIN_MONSTRUO = 5
            const DANIO_MAX_MONSTRUO = 12

            let danio = this.calcularHeridas(DANIO_MIN_MONSTRUO, DANIO_MAX_MONSTRUO)
            this.saludJugador -= danio

            this.turnos.unshift({
                esJugador: false,
                text: `El monstruo lastima al jugador en ${danio}`
            })

            this.verificarGanador()
        },

        calcularHeridas: function (min , max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.turnos = []
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            } else if (this.saludJugador <= 0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.turnos = []
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});