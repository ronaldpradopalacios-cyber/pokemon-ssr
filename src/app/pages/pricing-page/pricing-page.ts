import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    // console.log(this.platform);

    // if(!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing Page';
    // }

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({name: 'description', content: 'Este es mi Pricing Page'});
    this.meta.updateTag({name: 'og:title', content: 'Pricing Page'});
  }
}
