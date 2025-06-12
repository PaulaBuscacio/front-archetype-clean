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
  artidactId: string = '';
  isLoading: boolean = false;
  progressMessage: string = '';

  generateProject() {
    this.isLoading = true;
    this.progressMessage = 'Gerando projeto...';

    const artifactId = (document.getElementById('input1') as HTMLInputElement).value;
    const groupId = (document.getElementById('input2') as HTMLInputElement).value;
      const body = {
      artifactId: artifactId,
      groupId: groupId
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
            : `${artifactId}.zip`;

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
          setTimeout(() => {
            this.isLoading = false;
            this.progressMessage = '';
          }, 2000);
        }
      },
    error:error => {
      console.error('Erro ao gerar o projeto:', error);
      alert('Erro ao gerar o projeto. Verifique o console para mais detalhes.');
    }
  });
  }

}

