import { Component, HostListener, OnInit } from '@angular/core';
import { Snake } from './snake';
import { Direction } from './direction';
import { Egg } from './egg';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-snake-page',
  templateUrl: './snake-page.component.html',
  styleUrls: ['./snake-page.component.css']
})
export class SnakePageComponent implements OnInit {

  constructor(
            // public auth: AuthService
            ) { }

  readonly size = 20;
  readonly gridSize = this.size * this.size;
  readonly cellWidth = 20; // in px
  readonly cells = new Array(this.size * this.size);
  readonly timestep = 100;
  readonly ngStyleCells = {
    width: `${this.size * this.cellWidth}px`
  }
  readonly snake: Snake = new Snake();
  readonly direnum = Direction;
  dead = false;

  time = 0;

  egg: Egg = new Egg(this.gridSize);

  paused = false;

  ngOnInit() {
    this.doSpawnEgg();
    const runTime = () => {
      setTimeout(() => {
        this.goStep();
        this.dead = this.snake.checkDead();
        if (this.dead) {
          console.log(this.snake.tail.length + 1 - 3);
          // this.auth.SetScore("snake",this.snake.tail.length + 1 - 3);
        }
        this.time++;
        if (!this.dead) {
          runTime();
        }
      }, this.timestep)
    }
    runTime();
  }

  doTogglePause() {
    this.paused = !this.paused;
  }

  doSpawnEgg() {
    this.egg = new Egg(this.gridSize, this.snake);
  }

  goStep() {
    if(!this.paused)
    {
      this.snake.goStep(this.size);
      this.eatEgg();
    }
    // this.snake.goStep(this.size);
    // this.eatEgg();
  }

  eatEgg() {
    const pos = this.snake.head.pos;
    if (this.isEgg(pos)) {
      this.doSpawnEgg();
      this.snake.grow();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(e: KeyboardEvent) {
    if (!this.dead) {
      const dir = KeyCodes[e.keyCode];
      // const dir = KeyCodes[e.key];

      this.changeDirAndGoStep(dir);
    }
  }

  changeDirAndGoStep(dir: any) {
    if (dir) {
      const canChangeDir = this.getCanChangeDir(dir, this.snake.dir);
      if (canChangeDir) {
        this.snake.dir = dir;
        this.goStep();
      }
    }
  }

  getCanChangeDir(d1: Direction, d2: Direction) {
    const dirs = [d1, d2];
    const filteredUpDown = dirs.filter(dir => dir === Direction.UP || dir === Direction.DOWN).length;
    const onlyOneDir = filteredUpDown === 2 || filteredUpDown === 0;
    return !onlyOneDir;
  }

  isEgg(cell: any) {
    return this.egg.pos === cell;
  }

  ngStyleCell(idx: number) {
    const bgEgg = this.isEgg(idx) ? 'orange' : null;
    const bgSnake = this.snake.isSnakeCell(idx) ? 'red' : null;
    const defaultBg = '#ccc';
    return {
      width: `${this.cellWidth}px`,
      height: `${this.cellWidth}px`,
      background: bgEgg || bgSnake || defaultBg
    }
  }

  playAgain() {
    window.location.reload();
  }  

}

const KeyCodes: any = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN
}