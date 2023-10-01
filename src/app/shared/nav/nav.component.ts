import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isCollapsed: boolean = true;
  public darkMode: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2, @Inject(DOCUMENT)
    private document: Document) { }

  ngOnInit() {
    this.darkMode = localStorage.getItem('DARK_MODE') === 'true' ? true : false;
    this.setDarkMode(this.darkMode);
  }

  public showMenu(): boolean {
    return this.router.url != '/user/login';
  }

  public setDarkMode(isDarkMode: boolean): void {
    this.darkMode = isDarkMode;
    localStorage.setItem('DARK_MODE', isDarkMode.toString());
    const themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;

    if (isDarkMode) {
      themeLink.href = '../../../assets/themes/bootstrap-darkly.min.css';
      this.renderer.addClass(this.document.body, 'dark');
      this.renderer.removeClass(this.document.body, 'light');

    } else {
      themeLink.href = '../../../assets/themes/bootstrap-cosmo.min.css';
      this.renderer.removeClass(this.document.body, 'dark');
      this.renderer.addClass(this.document.body, 'light');
    }
  }
}
