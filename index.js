class Diamond {
	constructor() {
		this.root = document.getElementById( 'diamond' );
		this.width = 6;
		this.height = 6;
		this.length = this.width * this.height;
		this.data = [];
		this.suits = [ '♤', '♡', '♧', '♢' ];

		this.fillSuits();
		this.render();
		this.foldNeighbors();
	}

	fillSuits() { // метод заполнения данных в массив
		for ( let i = 0; i < this.length; i++ ) {
			this.data.push( this.suits[ Math.floor( Math.random() * 4 ) ] );
		}
	}

	render() { // метод рисует нам наше поле
		const table = document.createElement( 'table' );
		for ( let y = 0; y < this.height; y++ ) {
			const tr = document.createElement( 'tr' );

			for ( let x = 0; x < this.width; x++ ) {
				const suit = this.data[ y * this.width + x ];
				const td = document.createElement( 'td' );
				td.innerHTML = suit === -1 ? '' : `<div data-x="${x}" data-y="${y}">${suit}</div>`;
				tr.appendChild( td );
			}

			table.appendChild( tr );
		}
		this.root.innerHTML = '';
		this.root.appendChild( table );
	}

	foldNeighbors( x, y, value ) {
		if ( this.data[ y * this.width + x ] === value ) {
			this.data[ y * this.width + x ] = -1;
			// рекурсия
			this.foldNeighbors( x - 1, y, value );
			this.foldNeighbors( x + 1, y, value );
			this.foldNeighbors( x, y - 1, value );
			this.foldNeighbors( x, y + 1, value );
		}
	}

	update( div ) {
		// читаем атрибуты
		const x = +div.dataset.x;
		const y = +div.dataset.y;

		// третий аргумент значение элемента на который кликнули
		this.foldNeighbors( x, y, this.data[ y * this.width + x ] );
		this.render();
	}

	init() {
		this.root.addEventListener( 'click', ( evt ) => { // вешаем ивент onclick на this.root
			// всплытие и перехват + делегирование событий
			const div = evt.target.closest( 'div' );
			if ( !div ) return;
			if ( !this.root.contains( div ) ) return;
			this.update( div );
		} );
	}
}

const diamond = new Diamond(); // инициализируем класс 
diamond.init();