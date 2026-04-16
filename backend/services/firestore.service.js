/**
 * Servicio de Firestore
 * Abstrae las operaciones comunes con Firestore
 */
const { db } = require('../config/firebase');
const logger = require('../utils/logger');

/**
 * Obtiene un documento por ID
 * @param {String} collection - Nombre de la colección
 * @param {String} docId - ID del documento
 * @returns {Promise<Object|null>} Documento o null si no existe
 */
const getDocument = async (collection, docId) => {
  try {
    const docRef = await db.collection(collection).doc(docId).get();
    
    if (!docRef.exists) {
      return null;
    }
    
    return {
      id: docRef.id,
      ...docRef.data(),
    };
  } catch (error) {
    logger.error(`Error obteniendo documento ${docId} de ${collection}:`, error);
    throw error;
  }
};

/**
 * Obtiene todos los documentos de una colección con filtros opcionales
 * @param {String} collection - Nombre de la colección
 * @param {Object} options - Opciones de consulta
 * @returns {Promise<Array>} Array de documentos
 */
const getDocuments = async (collection, options = {}) => {
  try {
    const {
      where = [],
      orderBy = null,
      limit = 100,
      offset = 0,
    } = options;
    
    let query = db.collection(collection);
    
    // Aplicar filtros where
    where.forEach(([field, operator, value]) => {
      query = query.where(field, operator, value);
    });
    
    // Aplicar ordenamiento
    if (orderBy) {
      query = query.orderBy(orderBy.field, orderBy.direction || 'asc');
    }
    
    // Aplicar límite y offset
    query = query.limit(limit).offset(offset);
    
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return [];
    }
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error(`Error obteniendo documentos de ${collection}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo documento
 * @param {String} collection - Nombre de la colección
 * @param {Object} data - Datos del documento
 * @param {String} docId - ID opcional del documento
 * @returns {Promise<Object>} Documento creado
 */
const createDocument = async (collection, data, docId = null) => {
  try {
    const timestamp = new Date().toISOString();
    const docData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    let docRef;
    
    if (docId) {
      docRef = db.collection(collection).doc(docId);
      await docRef.set(docData);
    } else {
      docRef = await db.collection(collection).add(docData);
    }
    
    return {
      id: docRef.id,
      ...docData,
    };
  } catch (error) {
    logger.error(`Error creando documento en ${collection}:`, error);
    throw error;
  }
};

/**
 * Actualiza un documento existente
 * @param {String} collection - Nombre de la colección
 * @param {String} docId - ID del documento
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Documento actualizado
 */
const updateDocument = async (collection, docId, data) => {
  try {
    const docRef = db.collection(collection).doc(docId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new Error('Documento no encontrado');
    }
    
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    await docRef.update(updateData);
    
    const updatedDoc = await docRef.get();
    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };
  } catch (error) {
    logger.error(`Error actualizando documento ${docId} en ${collection}:`, error);
    throw error;
  }
};

/**
 * Elimina un documento
 * @param {String} collection - Nombre de la colección
 * @param {String} docId - ID del documento
 * @returns {Promise<void>}
 */
const deleteDocument = async (collection, docId) => {
  try {
    const docRef = db.collection(collection).doc(docId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new Error('Documento no encontrado');
    }
    
    await docRef.delete();
    logger.info(`Documento ${docId} eliminado de ${collection}`);
  } catch (error) {
    logger.error(`Error eliminando documento ${docId} de ${collection}:`, error);
    throw error;
  }
};

/**
 * Verifica si un documento existe
 * @param {String} collection - Nombre de la colección
 * @param {String} docId - ID del documento
 * @returns {Promise<Boolean>}
 */
const documentExists = async (collection, docId) => {
  try {
    const docRef = await db.collection(collection).doc(docId).get();
    return docRef.exists;
  } catch (error) {
    logger.error(`Error verificando existencia de documento ${docId}:`, error);
    throw error;
  }
};

/**
 * Cuenta documentos en una colección con filtros opcionales
 * @param {String} collection - Nombre de la colección
 * @param {Object} options - Opciones de consulta
 * @returns {Promise<Number>}
 */
const countDocuments = async (collection, options = {}) => {
  try {
    const docs = await getDocuments(collection, { ...options, limit: 10000 });
    return docs.length;
  } catch (error) {
    logger.error(`Error contando documentos en ${collection}:`, error);
    throw error;
  }
};

module.exports = {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  documentExists,
  countDocuments,
};

