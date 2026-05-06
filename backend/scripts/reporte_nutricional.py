#!/usr/bin/env python3
"""
Reporte nutricional simple para el Planeador de Dietas.

Uso:
  python reporte_nutricional.py --email admin@planeador.com --password 123456

El script:
1. Inicia sesion contra la API del backend
2. Consulta el resumen del panel admin
3. Imprime un reporte legible en consola
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from statistics import mean
from typing import Any
from urllib import error, request


def post_json(url: str, payload: dict[str, Any]) -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8")
    req = request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Error HTTP {exc.code} en {url}: {body}") from exc
    except error.URLError as exc:
        raise RuntimeError(f"No se pudo conectar con {url}: {exc.reason}") from exc


def get_json(url: str, token: str) -> dict[str, Any]:
    req = request.Request(
        url,
        headers={"Authorization": f"Bearer {token}"},
        method="GET",
    )

    try:
        with request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Error HTTP {exc.code} en {url}: {body}") from exc
    except error.URLError as exc:
        raise RuntimeError(f"No se pudo conectar con {url}: {exc.reason}") from exc


def formatear_reporte(data: dict[str, Any]) -> str:
    resumen = data.get("resumen", {})
    usuarios = data.get("usuarios", [])
    dietas = data.get("dietas", [])

    objetivos = Counter(
        usuario.get("objetivo_personal", "Sin definir") for usuario in usuarios
    )
    dietas_por_usuario = Counter(dieta.get("usuario", "Usuario local") for dieta in dietas)
    imcs = [usuario.get("imc") for usuario in usuarios if usuario.get("imc") is not None]
    calorias = [
        float(dieta.get("total_calorias", 0))
        for dieta in dietas
        if dieta.get("total_calorias") is not None
    ]

    usuario_mas_activo = "Sin datos"
    if dietas_por_usuario:
        nombre, cantidad = dietas_por_usuario.most_common(1)[0]
        usuario_mas_activo = f"{nombre} ({cantidad} dietas)"

    objetivo_dominante = "Sin datos"
    if objetivos:
        objetivo, cantidad = objetivos.most_common(1)[0]
        objetivo_dominante = f"{objetivo} ({cantidad} usuarios)"

    promedio_imc = f"{mean(imcs):.1f}" if imcs else "Sin datos"
    promedio_calorias = f"{mean(calorias):.0f}" if calorias else "Sin datos"

    lineas = [
        "REPORTE NUTRICIONAL DEL SISTEMA",
        "-" * 38,
        f"Usuarios registrados: {resumen.get('total_usuarios', 0)}",
        f"Dietas registradas: {resumen.get('total_dietas', 0)}",
        f"Dietas activas: {resumen.get('dietas_activas', 0)}",
        f"Dietas completadas: {resumen.get('dietas_completadas', 0)}",
        f"Promedio de IMC: {promedio_imc}",
        f"Promedio de calorias: {promedio_calorias}",
        f"Objetivo mas comun: {objetivo_dominante}",
        f"Usuario con mas dietas: {usuario_mas_activo}",
        "",
        "Detalle rapido de usuarios:",
    ]

    if not usuarios:
        lineas.append("- No hay usuarios disponibles.")
    else:
        for usuario in usuarios[:5]:
            lineas.append(
                "- {nombre} | objetivo: {objetivo} | IMC: {imc} | peso actual: {peso} kg".format(
                    nombre=usuario.get("nombre", "Sin nombre"),
                    objetivo=usuario.get("objetivo_personal", "Sin definir"),
                    imc=usuario.get("imc", "Sin dato"),
                    peso=usuario.get("peso_actual", "Sin dato"),
                )
            )

    return "\n".join(lineas)


def main() -> int:
    parser = argparse.ArgumentParser(description="Genera un reporte nutricional desde la API.")
    parser.add_argument(
        "--base-url",
        default="http://localhost:3000/api",
        help="URL base de la API. Por defecto usa http://localhost:3000/api",
    )
    parser.add_argument(
        "--email",
        default="admin@planeador.com",
        help="Correo del administrador para iniciar sesion",
    )
    parser.add_argument(
        "--password",
        default="123456",
        help="Contrasena del administrador",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Imprime el reporte crudo en formato JSON",
    )
    args = parser.parse_args()

    try:
        login_data = post_json(
            f"{args.base_url}/auth/login",
            {"email": args.email, "password": args.password},
        )
        token = login_data.get("token")
        if not token:
            raise RuntimeError("La API no devolvio token en el login.")

        resumen = get_json(f"{args.base_url}/admin/resumen", token)
    except RuntimeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    if args.json:
        print(json.dumps(resumen, indent=2, ensure_ascii=False))
        return 0

    print(formatear_reporte(resumen))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
