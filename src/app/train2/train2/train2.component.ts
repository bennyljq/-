import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs';
import { ThemeService } from 'src/app/physics/theme.service';

@Component({
  selector: 'app-train2',
  templateUrl: './train2.component.html',
  styleUrls: ['./train2.component.scss']
})
export class Train2Component {

  constructor (
    public themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  theme: 0 | 1 = 1 // 0 = light, 1 = dark
  currentPage = "home"
  pageWidth = 0
  pageHeight = 0
  skewAngle = 0
  numWood = 20
  showWood = true
  pages = [
    "home",
    "concept"
  ]
  bgState: 0 | 1 = 0
  bgHeight = 45
  bgSkewHeight = 0.2
  
  ngOnInit() {
    this.theme == 1 ? this.themeService.darkTheme() : this.themeService.lightTheme()
    this.onResize()
    let frag = this.route.snapshot.fragment
    if (frag) {
      this.currentPage = frag
    } else {
      this.router.navigate( [], { fragment: this.currentPage } )
    }
    this.pageTransition(frag)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this.setBg(this.bgState)
  }

  setBg(state: 0 | 1) {
    if (state == 0) {
      this.bgState = 0
      this.bgHeight = 45
      this.bgSkewHeight = 0.2
    } else if (state == 1) {
      this.bgState = 1
      this.bgHeight = 70
      this.bgSkewHeight = 0.3
    }
    this.skewAngle = Math.atan( (this.pageHeight*this.bgSkewHeight) / this.pageWidth * -1) * 180 / Math.PI
    this.numWood = Math.ceil(this.pageWidth / this.pageHeight * 20)
  }

  async pageTransition(toPage: any) {
    this.router.navigate( [], { fragment: toPage } )
    if (toPage != 'home') {
      this.setBg(1)
    } else {
      this.setBg(0)
    }
    await lastValueFrom(timer(500))
    this.currentPage = toPage
  }

}
