// src/modules/users/pages/VehicleDocumentsPage.tsx
import React, { useState } from 'react';
import './vehicle-documents.css';
import RideciLogo from "../../../assets/rideci-logo-blanco.png";

const VehicleDocumentsPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'moto' | 'carro'>('moto');
  const [color, setColor] = useState('');
  const [placa, setPlaca] = useState('');
  const [referencia, setReferencia] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [propertyCardFile, setPropertyCardFile] = useState<File | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
  
  // ESTADOS NUEVOS PARA EL MODAL (AGREGADOS)
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVehicleTypeToggle = (type: 'moto' | 'carro') => {
    setVehicleType(type);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'property' | 'photo') => {
    const file = e.target.files?.[0];
    if (file) {
      switch (type) {
        case 'license':
          setLicenseFile(file);
          break;
        case 'property':
          setPropertyCardFile(file);
          break;
        case 'photo':
          setVehiclePhoto(file);
          break;
      }
      console.log(`${type} file uploaded:`, file.name);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // FUNCIÓN MODIFICADA PARA MOSTRAR MODAL
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // Muestra el modal en lugar de enviar directamente
  };

  // FUNCIÓN NUEVA PARA CONFIRMAR ENVÍO
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log({
      vehicleType,
      color,
      placa,
      referencia,
      licenseFile: licenseFile?.name,
      propertyCardFile: propertyCardFile?.name,
      vehiclePhoto: vehiclePhoto?.name,
    });
    
    setIsSubmitting(false);
    setShowModal(false);
    alert('¡Documentos enviados exitosamente! Tu cuenta está pendiente de aprobación.');
  };

  // FUNCIÓN NUEVA PARA CANCELAR
  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  const handleAddVehicle = () => {
    alert('Añadir otro vehículo (mock)');
  };

  return (
    <div className="vehicle-documents-container">
      {/* Fondo gradiente */}
      <div className="background-gradient"></div>
      
      {/* Header */}
      <header className="document-header">
        <div className="back-button">
          <span className="back-arrow">←</span>
        </div>
            <div className="images-column">
                <img src={RideciLogo} alt="RIDECI" className="image-logo" />
            </div>
      </header>

      {/* Mensaje de bienvenida */}
      <section className="welcome-section">
        <h1 className="welcome-title">Apreciado conductor</h1>
        <p className="welcome-message">
          Por favor cargue los documentos solicitados. Cualquier inconsistencia<br />
          resultará en la negación de su nuevo perfil.
        </p>
      </section>

      {/* Formulario principal */}
      <div className="documents-form-container">
        <form onSubmit={handleSubmit} className="documents-form">
          
          {/* Sección de información del vehículo */}
          <section className="form-section vehicle-info-section">
            <h2 className="section-title">Información del Vehículo</h2>
            
            <div className="vehicle-info-grid">
              {/* Foto del vehículo */}
              <div className="vehicle-photo-section">
                <div className="photo-upload-area">
                  <div className="photo-placeholder">
                    <span className="photo-icon">📷</span>
                    <p className="photo-text">Foto del Vehículo</p>
                  </div>
                  <input
                    type="file"
                    id="vehicle-photo"
                    accept="image/*"
                    className="file-input"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                  />
                  <label htmlFor="vehicle-photo" className="upload-button">
                    Cargar foto
                  </label>
                </div>
              </div>

              {/* Información del vehículo */}
              <div className="vehicle-details">
                <div className="input-group">
                  <label className="input-label">Placa del Vehículo</label>
                  <div className="plate-input-wrapper">
                    <div className="plate-icon">🚗</div>
                    <input
                      type="text"
                      className="plate-input"
                      placeholder="AB123CD"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Referencia del Vehículo</label>
                  <div className="input-wrapper">
                    <div className="input-icon">ℹ️</div>
                    <input
                      type="text"
                      className="text-input"
                      placeholder="Ingresa referencia del vehículo"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tipo y color del vehículo */}
            <div className="vehicle-options">
              <div className="option-group">
                <label className="option-label">Tipo de Vehículo</label>
                <div className="vehicle-type-toggle">
                  <button
                    type="button"
                    className={`toggle-button ${vehicleType === 'moto' ? 'active' : ''}`}
                    onClick={() => handleVehicleTypeToggle('moto')}
                  >
                    Moto
                  </button>
                  <button
                    type="button"
                    className={`toggle-button ${vehicleType === 'carro' ? 'active' : ''}`}
                    onClick={() => handleVehicleTypeToggle('carro')}
                  >
                    Carro
                  </button>
                </div>
              </div>

              <div className="option-group">
                <label className="option-label">Color del vehículo</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    className="color-input"
                    value={color}
                    onChange={handleColorChange}
                  />
                  <div className="color-display">
                    <span className="color-text">
                      {color ? color : 'Escoge el color'}
                    </span>
                    <span className="color-arrow">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de información del conductor */}
          <section className="form-section driver-info-section">
            <h2 className="section-title">Información del Conductor</h2>
            
            <div className="documents-grid">
              {/* Tarjeta de propiedad */}
              <div className="document-upload-group">
                <label className="document-label">Tarjeta de Propiedad</label>
                <div className="document-upload-area">
                  <div className="document-icon">📄</div>
                  <div className="document-input-wrapper">
                    <input
                      type="file"
                      id="property-card"
                      accept=".pdf,.jpg,.png"
                      className="file-input"
                      onChange={(e) => handleFileUpload(e, 'property')}
                    />
                    <div className="document-placeholder">
                      Carga documento
                    </div>
                    <label htmlFor="property-card" className="document-upload-button">
                      📎
                    </label>
                  </div>
                </div>
              </div>

              {/* Licencia de conducción */}
              <div className="document-upload-group">
                <label className="document-label">Licencia de Conducción</label>
                <div className="document-upload-area">
                  <div className="document-icon">🚘</div>
                  <div className="document-input-wrapper">
                    <input
                      type="file"
                      id="license"
                      accept=".pdf,.jpg,.png"
                      className="file-input"
                      onChange={(e) => handleFileUpload(e, 'license')}
                    />
                    <div className="document-placeholder">
                      Carga documento
                    </div>
                    <label htmlFor="license" className="document-upload-button">
                      📎
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Botones */}
          <div className="form-buttons">
            <button type="submit" className="primary-button">
              Guardar Vehículo
            </button>
            <button type="button" className="secondary-button" onClick={handleAddVehicle}>
              Añadir Vehículo
            </button>
          </div>
        </form>
      </div>

      {/* MODAL DE CONFIRMACIÓN - AGREGADO AL FINAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3 className="modal-title">¿Acepta el envío de documentos?</h3>
              
              <div className="modal-message">
                <p>Tu cuenta queda pendiente de aprobación.</p>
                <p>Una vez se acepte podrás ingresar.</p>
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="modal-button confirm-btn"
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar'}
                </button>
                <button
                  type="button"
                  className="modal-button cancel-btn"
                  onClick={handleCancelSubmit}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
              </div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDocumentsPage;