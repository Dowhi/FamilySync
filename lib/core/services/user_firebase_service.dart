import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:calendario_familiar/core/models/local_user.dart';

class UserFirebaseService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  static const String _usersCollection = 'users';
  static const String _familyId = 'default_family';

  /// Obtener todos los usuarios de Firebase
  Stream<List<LocalUser>> getUsersStream() {
    return _firestore
        .collection(_usersCollection)
        .where('familyId', isEqualTo: _familyId)
        .orderBy('id')
        .snapshots()
        .map((snapshot) {
      if (snapshot.docs.isEmpty) {
        // Si no hay usuarios en Firebase, retornar usuarios por defecto
        return localUsers;
      }
      
      return snapshot.docs.map((doc) {
        final data = doc.data();
        return LocalUser(
          id: data['id'] as int,
          name: data['name'] as String,
          color: _colorFromHex(data['color'] as String),
        );
      }).toList();
    });
  }

  /// Obtener usuarios como Future
  Future<List<LocalUser>> getUsers() async {
    try {
      final snapshot = await _firestore
          .collection(_usersCollection)
          .where('familyId', isEqualTo: _familyId)
          .orderBy('id')
          .get();

      if (snapshot.docs.isEmpty) {
        // Si no hay usuarios, crear los usuarios por defecto
        await _initializeDefaultUsers();
        return localUsers;
      }

      return snapshot.docs.map((doc) {
        final data = doc.data();
        return LocalUser(
          id: data['id'] as int,
          name: data['name'] as String,
          color: _colorFromHex(data['color'] as String),
        );
      }).toList();
    } catch (e) {
      print('Error obteniendo usuarios: $e');
      return localUsers;
    }
  }

  /// Inicializar usuarios por defecto en Firebase
  Future<void> _initializeDefaultUsers() async {
    try {
      final batch = _firestore.batch();

      for (final user in localUsers) {
        final docRef = _firestore
            .collection(_usersCollection)
            .doc('${_familyId}_user_${user.id}');

        batch.set(docRef, {
          'id': user.id,
          'name': user.name,
          'color': _colorToHex(user.color),
          'familyId': _familyId,
          'createdAt': FieldValue.serverTimestamp(),
          'updatedAt': FieldValue.serverTimestamp(),
        });
      }

      await batch.commit();
      print('✅ Usuarios por defecto inicializados en Firebase');
    } catch (e) {
      print('❌ Error inicializando usuarios: $e');
    }
  }

  /// Agregar un nuevo usuario
  Future<void> addUser({
    required int id,
    required String name,
    required String colorHex,
  }) async {
    try {
      await _firestore
          .collection(_usersCollection)
          .doc('${_familyId}_user_$id')
          .set({
        'id': id,
        'name': name,
        'color': colorHex,
        'familyId': _familyId,
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
      print('✅ Usuario agregado: $name');
    } catch (e) {
      print('❌ Error agregando usuario: $e');
      rethrow;
    }
  }

  /// Actualizar un usuario
  Future<void> updateUser({
    required int id,
    required String name,
    required String colorHex,
  }) async {
    try {
      await _firestore
          .collection(_usersCollection)
          .doc('${_familyId}_user_$id')
          .update({
        'name': name,
        'color': colorHex,
        'updatedAt': FieldValue.serverTimestamp(),
      });
      print('✅ Usuario actualizado: $name');
    } catch (e) {
      print('❌ Error actualizando usuario: $e');
      rethrow;
    }
  }

  /// Eliminar un usuario
  Future<void> deleteUser(int id) async {
    try {
      await _firestore
          .collection(_usersCollection)
          .doc('${_familyId}_user_$id')
          .delete();
      print('✅ Usuario eliminado: $id');
    } catch (e) {
      print('❌ Error eliminando usuario: $e');
      rethrow;
    }
  }

  /// Convertir color a hex
  String _colorToHex(Color color) {
    return '#${color.value.toRadixString(16).padLeft(8, '0').substring(2)}';
  }

  /// Convertir hex a color
  Color _colorFromHex(String hex) {
    final hexCode = hex.replaceAll('#', '');
    return Color(int.parse('FF$hexCode', radix: 16));
  }
}

// Importar Color
import 'package:flutter/material.dart';

