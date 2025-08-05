import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LogDTO } from 'src/app/Interface/Models/log-dto';
import { LogsService } from 'src/app/Services/logs.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-edit-log',
  templateUrl: './edit-log.component.html',
  styleUrls: ['./edit-log.component.css'],
})
export class EditLogComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public logService: LogsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  selectedLog: LogDTO | null = null;

  ngOnInit(): void {
    this.selectedLog = this.config.data.log as LogDTO;
    if (!this.selectedLog || !this.selectedLog.id) {
      console.error('No se proporcionó un log válido para editar.');
      this.ref.close();
      return;
    }
    
    // Convertir la fecha a objeto Date para p-calendar
    if (this.selectedLog.query_date) {
      if (typeof this.selectedLog.query_date === 'string') {
        this.selectedLog.query_date = new Date(
          this.selectedLog.query_date.replace(' ', 'T')
        );
      }
    }
  }

  onSave() {
    if (!this.selectedLog) return;

    // Se hizo tan raro porque si no en Java daba problemas
    // Convertir la fecha a string antes de guardar
    let logToSave = { ...this.selectedLog };
    if (logToSave.query_date instanceof Date) {
      // Formato yyyy-MM-dd HH:mm:ss.SSS
      const pad = (n: number, width: number = 2) =>
        n.toString().padStart(width, '0');
      const date = logToSave.query_date as Date;
      logToSave.query_date = `${date.getFullYear()}-${pad(
        date.getMonth() + 1
      )}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
        date.getMinutes()
      )}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
    }

    this.logService.updateLogs(logToSave).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'El log se guardó correctamente',
        });
        this.ref.close(true);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el log',
        });
      },
    });
  }
  // Metodo para eliminar log dentro del dialog
  // No implementado
  onDelteLog(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.logService.deleteLogs(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'El log se eliminó correctamente',
            });
            this.ref.close(true);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el log',
            });
          },
        });
      },
    });
  }
}
