const db = require('../config/db');

// Obtener todas las dietas con sus alimentos
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
            console.log(err);
            return res.status(500).json({ error: 'Error al obtener dietas' });
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

// Crear una nueva dieta (para después)
const crearDieta = (req, res) => {
    res.json({ msg: 'Próximamente: crear dieta' });
};

module.exports = { obtenerDietas, crearDieta };