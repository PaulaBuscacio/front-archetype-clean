import { Routes } from '@angular/router';

// Exemplo de rota Angular para um componente que faz POST para http://localhost:8080/archetype
// Angular não define rotas HTTP diretamente, mas você pode criar uma rota para um componente que faz a requisição POST

import { ArchetypePostComponentComponent } from './archetype-post-component/archetype-post-component.component';

export const routes: Routes = [
   {
     path: 'archetype-post',
     component: ArchetypePostComponentComponent
   }
 ];


