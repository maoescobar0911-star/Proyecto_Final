const db = require('../config/db');

// Obtener todas las dietas (versión simplificada)
const obtenerDietas = (req, res) => {
    const sql = `
        SELECT 
            u.nombre AS usuario,
            d.id AS dieta_id,
            d.nombre AS dieta,
            d.descripcion,
            d.fecha,
            d.total_calorias,
            a.nombre AS alimento,
            da.cantidad,
            (da.cantidad * a.calorias / 100) AS calorias_alimento
        FROM usuarios u
        JOIN dietas d ON u.id = d.usuario_id
        JOIN dieta_alimentos da ON d.id = da.dieta_id
        JOIN alimentos a ON da.alimento_id = a.id
        ORDER BY d.id, a.nombre
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error SQL:', err);
            return res.status(500).json({ error: 'Error al obtener dietas', detalle: err.message });
        }
        
        // Si no hay resultados, devolver array vacío
        if (results.length === 0) {
            return res.json([]);
        }
        
        // Organizar los datos por dieta
        const dietas = {};
        results.forEach(row => {
            if (!dietas[row.dieta_id]) {
                dietas[row.dieta_id] = {
                    id: row.dieta_id,
                    nombre: row.dieta,
                    descripcion: row.descripcion,
                    fecha: row.fecha,
                    total_calorias: row.total_calorias,
                    usuario: row.usuario,
                    alimentos: []
                };
            }
            dietas[row.dieta_id].alimentos.push({
                nombre: row.alimento,
                cantidad: row.cantidad,
                calorias: row.calorias_alimento
            });
        });
        
        res.json(Object.values(dietas));
    });
};

// Crear nueva dieta
const crearDieta = (req, res) => {
    const { usuario_id, nombre, descripcion, total_calorias } = req.body;
    
    const sql = 'INSERT INTO dietas (usuario_id, nombre, descripcion, total_calorias) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [usuario_id, nombre, descripcion, total_calorias], (err, result) => {
        if (err) {
            console.error('Error al crear dieta:', err);
            return res.status(500).json({ error: 'Error al crear dieta' });
        }
        res.json({ msg: 'Dieta creada exitosamente', id: result.insertId });
    });
};

module.exports = { obtenerDietas, crearDieta };