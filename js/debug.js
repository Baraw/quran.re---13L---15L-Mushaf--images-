// Variable pour activer/désactiver le mode debug
const debugMode = true; // Passez à false pour désactiver les logs de debug

// Fonction de log conditionnelle
export function debugLog(message)
 { 
		if (debugMode) {    console.log(message);  }
}
