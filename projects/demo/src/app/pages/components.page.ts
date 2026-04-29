import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UIButtonDirective } from '@aria-ng/ui';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [RouterLink, UIButtonDirective],
  templateUrl: './components.page.html',
  styleUrl: './components.page.css',
})
export class ComponentsPage {}
