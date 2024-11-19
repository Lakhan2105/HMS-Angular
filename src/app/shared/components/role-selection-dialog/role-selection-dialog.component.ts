import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-role-selection-dialog',
  templateUrl: './role-selection-dialog.component.html',
  styleUrls: ['./role-selection-dialog.component.scss']
})
export class RoleSelectionDialogComponent {
  constructor(
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<RoleSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public roles: string[]
  ) {}

  onSelectRole(role: string): void {
    this.dialogRef.close(role);  
  }

  onCancel() {
    this.dialogRef.close();
    this.tokenStorage.clearStorage();
  }
}
