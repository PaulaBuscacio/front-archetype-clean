import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-archetype-post-component',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './archetype-post-component.component.html',
  styleUrl: './archetype-post-component.component.css'
})
export class ArchetypePostComponentComponent {

  constructor(private http: HttpClient) {}
  groupId: string = '';
  artifactId: string = '';
  isLoading: boolean = false;
  progressMessage: string = '';

  generateProject() {
    this.isLoading = true;
    this.progressMessage = 'Gerando projeto...';

      const body = {
      artifactId: this.artifactId,
      groupId: this.groupId
    };
        const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/zip'
    });
   this.http.post('http://localhost:8080/archetype', body, {
      headers: headers,
      responseType: 'blob', // Importante para receber dados binários
      observe: 'response'
    }).subscribe({
      next: (response) => {
        this.progressMessage = 'Preparando download...';
        if (response.body) {
          // Criar o blob com o tipo correto
          const blob = new Blob([response.body], { type: 'application/zip' });

          // Pegar o nome do arquivo do header da resposta, se disponível
          const contentDisposition = response.headers.get('content-disposition');
          const fileName = contentDisposition
            ? contentDisposition.split(';')[1].split('=')[1].replace(/"/g, '')
            : `${this.artifactId}.zip`;

          // Criar URL do objeto blob
          const url = window.URL.createObjectURL(blob);

          // Criar elemento <a> para download
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;

          // Trigger do download
          document.body.appendChild(a);
          a.click();

          // Cleanup
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          this.progressMessage = 'Download concluído!';
          // Resetar os campos de entrada
         this.artifactId = '';
         this.groupId = '';
          setTimeout(() => {

            this.isLoading = false;
            this.progressMessage = '';

          }, 2000);
        }
      },
    error:error => {
      console.error('Erro ao gerar o projeto:', error);
      alert('Erro ao gerar o projeto: verifique o preenchimento dos campos e tente novamente.');
      // Resetar os campos de entrada
      this.artifactId = '';
      this.groupId = '';
      this.isLoading = false;

    }
  });
  }

}

