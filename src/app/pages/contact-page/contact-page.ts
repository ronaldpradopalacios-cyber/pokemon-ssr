import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
    private title = inject(Title);
    private meta = inject(Meta);

    ngOnInit(): void {
      this.title.setTitle('Contact Page');

      this.meta.updateTag({name: 'description', content: 'Este es mi Contact Page'});
      this.meta.updateTag({name: 'og:title', content: 'Contact Page'});
    }
}
