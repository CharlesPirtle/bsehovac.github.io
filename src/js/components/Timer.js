class Timer {

	constructor( game ) {

		this.game = game;

		this.startTime = null;
		this.animate = this.update.bind( this );

	}

	start( continueGame ) {

		this.startTime = ( continueGame ) ? ( Date.now() - this.deltaTime ) : Date.now();
		this.deltaTime = 0;
		this.converted = this.convert( this.deltaTime );

		CUBE.Animate.add( this.animate );

	}

	stop() {

		this.currentTime = Date.now();
		this.deltaTime = this.currentTime - this.startTime;

		CUBE.Animate.remove( this.animate );

		return { time: this.convert( this.deltaTime ), millis: this.deltaTime };

	}

	update() {

		const old = this.converted;

		this.currentTime = Date.now();
		this.deltaTime = this.currentTime - this.startTime;
		this.converted = this.convert( this.deltaTime );

		if ( this.converted != old ) {

			localStorage.setItem( 'gameTime', JSON.stringify( this.deltaTime ) );
			this.game.dom.timer.innerHTML = this.converted;

		}

	}

	convert( time ) {

		this.seconds = parseInt( ( time / 1000 ) % 60 );
		this.minutes = parseInt( ( time / ( 1000 * 60 ) ) );

		return this.minutes + ':' + ( this.seconds < 10 ? '0' : '' ) + this.seconds;

	}

}

export { Timer };
