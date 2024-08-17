const acronyms = {
    "PT": {
        "definition": "Penetration Test",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pt"},
            {"name": "Official Site", "url": "https://richeymay.com/cybersecurity-services/"}
        ]
    },
    "CISSP": {
        "definition": "Certified Information Systems Security Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cissp"},
            {"name": "Official Site", "url": "https://www.isc2.org/Certifications/CISSP"}
        ]
    },
    "CEH": {
        "definition": "Certified Ethical Hacker",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ceh"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"}
        ]
    },
    "CISM": {
        "definition": "Certified Information Security Manager",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cism"},
            {"name": "Official Site", "url": "https://www.isaca.org/credentialing/cism"}
        ]
    },
    "CISA": {
        "definition": "Certified Information Systems Auditor",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cisa"},
            {"name": "Official Site", "url": "https://www.isaca.org/credentialing/cisa"}
        ]
    },
    "OSCP": {
        "definition": "Offensive Security Certified Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/oscp"},
            {"name": "Official Site", "url": "https://www.offensive-security.com/pwk-oscp/"}
        ]
    },
    "SSCP": {
        "definition": "Systems Security Certified Practitioner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sscp"},
            {"name": "Official Site", "url": "https://www.isc2.org/Certifications/SSCP"}
        ]
    },
    "CHFI": {
        "definition": "Computer Hacking Forensic Investigator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/chfi"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/computer-hacking-forensic-investigator-chfi/"}
        ]
    },
    "GSEC": {
        "definition": "GIAC Security Essentials Certification",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gsec"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/security-essentials-gsec"}
        ]
    },
    "GCIH": {
        "definition": "GIAC Certified Incident Handler",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gcih"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/certified-incident-handler-gcih"}
        ]
    },
    "GPEN": {
        "definition": "GIAC Penetration Tester",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gpen"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/penetration-tester-gpen"}
        ]
    },
    "GCFA": {
        "definition": "GIAC Certified Forensic Analyst",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gcfa"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/certified-forensic-analyst-gcfa"}
        ]
    },
    "CCSP": {
        "definition": "Certified Cloud Security Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccsp"},
            {"name": "Official Site", "url": "https://www.isc2.org/Certifications/CCSP"}
        ]
    },
    "CRISC": {
        "definition": "Certified in Risk and Information Systems Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/crisc"},
            {"name": "Official Site", "url": "https://www.isaca.org/credentialing/crisc"}
        ]
    },
    "CGEIT": {
        "definition": "Certified in the Governance of Enterprise IT",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cgeit"},
            {"name": "Official Site", "url": "https://www.isaca.org/credentialing/cgeit"}
        ]
    },
    "ECSA": {
        "definition": "EC-Council Certified Security Analyst",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ecsa"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/ec-council-certified-security-analyst-ecsa/"}
        ]
    },
    "CPT": {
        "definition": "Certified Penetration Tester",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cpt"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/certified-penetration-tester-cpt/"}
        ]
    },
    "LPT": {
        "definition": "Licensed Penetration Tester",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/lpt"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/licensed-penetration-tester-lpt/"}
        ]
    },
    "CASP": {
        "definition": "CompTIA Advanced Security Practitioner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/casp"},
            {"name": "Official Site", "url": "https://www.comptia.org/certifications/casp"}
        ]
    },
    "CIPP": {
        "definition": "Certified Information Privacy Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cipp/"}
        ]
    },
    "CIPT": {
        "definition": "Certified Information Privacy Technologist",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipt"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cipt/"}
        ]
    },
    "CIPM": {
        "definition": "Certified Information Privacy Manager",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipm"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cipm/"}
        ]
    },
    "CCNA": {
        "definition": "Cisco Certified Network Associate",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccna"},
            {"name": "Official Site", "url": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html"}
        ]
    },
    "CCNP": {
        "definition": "Cisco Certified Network Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccnp"},
            {"name": "Official Site", "url": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html"}
        ]
    },
    "CCIE": {
        "definition": "Cisco Certified Internetwork Expert",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccie"},
            {"name": "Official Site", "url": "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-enterprise-infrastructure.html"}
        ]
    },
    "CSSLP": {
        "definition": "Certified Secure Software Lifecycle Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/csslp"},
            {"name": "Official Site", "url": "https://www.isc2.org/Certifications/CSSLP"}
        ]
    },
    "CIPP/US": {
        "definition": "Certified Information Privacy Professional/United States",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp-us"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cippus/"}
        ]
    },
    "CIPP/E": {
        "definition": "Certified Information Privacy Professional/Europe",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp-e"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cippe/"}
        ]
    },
    "CRTP": {
        "definition": "Certified Red Team Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/crtp"},
            {"name": "Official Site", "url": "https://www.pentesteracademy.com/course?id=23"}
        ]
    },
    "CND": {
        "definition": "Certified Network Defender",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cnd"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/certified-network-defender-cnd/"}
        ]
    },
    "CTIA": {
        "definition": "Certified Threat Intelligence Analyst",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ctia"},
            {"name": "Official Site", "url": "https://www.eccouncil.org/programs/certified-threat-intelligence-analyst-ctia/"}
        ]
    },
    "CCFE": {
        "definition": "Certified Computer Forensics Examiner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccfe"},
            {"name": "Official Site", "url": "https://www.iacis.com/certifications/certified-computer-forensics-examiner-ccfe/"}
        ]
    },
    "GCFE": {
        "definition": "GIAC Certified Forensic Examiner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gcfe"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/certified-forensic-examiner-gcfe"}
        ]
    },
    "GREM": {
        "definition": "GIAC Reverse Engineering Malware",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/grem"},
            {"name": "Official Site", "url": "https://www.giac.org/certification/reverse-engineering-malware-grem"}
        ]
    },
    "OSWP": {
        "definition": "Offensive Security Wireless Professional",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/oswp"},
            {"name": "Official Site", "url": "https://www.offensive-security.com/awcpe-oswp/"}
        ]
    },
    "CPTC": {
        "definition": "Certified Penetration Testing Consultant",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cptc"},
            {"name": "Official Site", "url": "https://mile2.com/certified-penetration-testing-consultant-cptc.html"}
        ]
    },
    "CSX-P": {
        "definition": "Cybersecurity Practitioner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/csx-p"},
            {"name": "Official Site", "url": "https://www.isaca.org/credentialing/csx-p"}
        ]
    },
    "CIPP/M": {
        "definition": "Certified Information Privacy Professional/Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp-m"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cippm/"}
        ]
    },
    "CIPP/C": {
        "definition": "Certified Information Privacy Professional/Canada",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp-c"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cippc/"}
        ]
    },
    "CIPP/A": {
        "definition": "Certified Information Privacy Professional/Asia",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cipp-a"},
            {"name": "Official Site", "url": "https://iapp.org/certify/cippa/"}
        ]
    },
    "CCPA": {
        "definition": "California Consumer Privacy Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccpa"},
            {"name": "Official Site", "url": "https://oag.ca.gov/privacy/ccpa"}
        ]
    },
    "GDPR": {
        "definition": "General Data Protection Regulation",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gdpr"},
            {"name": "Official Site", "url": "https://gdpr.eu/"}
        ]
    },
    "HIPAA": {
        "definition": "Health Insurance Portability and Accountability Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/hipaa"},
            {"name": "Official Site", "url": "https://www.hhs.gov/hipaa/index.html"}
        ]
    },
    "PCI DSS": {
        "definition": "Payment Card Industry Data Security Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pci-dss"},
            {"name": "Official Site", "url": "https://www.pcisecuritystandards.org/"}
        ]
    },
    "NIST": {
        "definition": "National Institute of Standards and Technology",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nist"},
            {"name": "Official Site", "url": "https://www.nist.gov/"}
        ]
    },
    "FISMA": {
        "definition": "Federal Information Security Management Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fisma"},
            {"name": "Official Site", "url": "https://www.dhs.gov/fisma"}
        ]
    },
    "FERPA": {
        "definition": "Family Educational Rights and Privacy Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ferpa"},
            {"name": "Official Site", "url": "https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html"}
        ]
    },
    "SOX": {
        "definition": "Sarbanes-Oxley Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sox"},
            {"name": "Official Site", "url": "https://www.sec.gov/about/laws/sox2002.pdf"}
        ]
    },
    "GLBA": {
        "definition": "Gramm-Leach-Bliley Act",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/glba"},
            {"name": "Official Site", "url": "https://www.ftc.gov/tips-advice/business-center/privacy-and-security/gramm-leach-bliley-act"}
        ]
    },
    "NERC CIP": {
        "definition": "North American Electric Reliability Corporation Critical Infrastructure Protection",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nerc-cip"},
            {"name": "Official Site", "url": "https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx"}
        ]
    },
    "COBIT": {
        "definition": "Control Objectives for Information and Related Technologies",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cobit"},
            {"name": "Official Site", "url": "https://www.isaca.org/resources/cobit"}
        ]
    },
    "ISO 27001": {
        "definition": "Information Security Management System Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iso-27001"},
            {"name": "Official Site", "url": "https://www.iso.org/isoiec-27001-information-security.html"}
        ]
    },
    "ISO 27002": {
        "definition": "Code of Practice for Information Security Controls",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iso-27002"},
            {"name": "Official Site", "url": "https://www.iso.org/standard/54533.html"}
        ]
    },
    "ISO 27005": {
        "definition": "Information Security Risk Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iso-27005"},
            {"name": "Official Site", "url": "https://www.iso.org/standard/56742.html"}
        ]
    },
    "SOC 2": {
        "definition": "Service Organization Control 2",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/soc-2"},
            {"name": "Official Site", "url": "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/serviceorganization-smanagement.html"}
        ]
    },
    "SOC 3": {
        "definition": "Service Organization Control 3",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/soc-3"},
            {"name": "Official Site", "url": "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/serviceorganization-smanagement.html"}
        ]
    },
    "CERT": {
        "definition": "Computer Emergency Response Team",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cert"},
            {"name": "Official Site", "url": "https://www.cert.org/"}
        ]
    },
    "CIRT": {
        "definition": "Computer Incident Response Team",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cirt"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/"}
        ]
    },
    "CVE": {
        "definition": "Common Vulnerabilities and Exposures",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cve"},
            {"name": "Official Site", "url": "https://cve.mitre.org/"}
        ]
    },
    "CVSS": {
        "definition": "Common Vulnerability Scoring System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cvss"},
            {"name": "Official Site", "url": "https://www.first.org/cvss/"}
        ]
    },
    "DDoS": {
        "definition": "Distributed Denial of Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ddos"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/ncas/tips/ST04-015"}
        ]
    },
    "IDS": {
        "definition": "Intrusion Detection System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ids"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/ncas/tips/ST04-015"}
        ]
    },
    "IPS": {
        "definition": "Intrusion Prevention System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ips"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/ncas/tips/ST04-015"}
        ]
    },
    "IAM": {
        "definition": "Identity and Access Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iam"},
            {"name": "Official Site", "url": "https://www.nist.gov/programs-projects/identity-and-access-management"}
        ]
    },
    "MFA": {
        "definition": "Multi-Factor Authentication",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mfa"},
            {"name": "Official Site", "url": "https://csrc.nist.gov/projects/multi-factor-authentication"}
        ]
    },
    "PKI": {
        "definition": "Public Key Infrastructure",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pki"},
            {"name": "Official Site", "url": "https://www.nist.gov/itl/pki"}
        ]
    },
    "SOC": {
        "definition": "Security Operations Center",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/soc"},
            {"name": "Official Site", "url": "https://www.cisa.gov/security-operations-center"}
        ]
    },
    "SIEM": {
        "definition": "Security Information and Event Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/siem"},
            {"name": "Official Site", "url": "https://www.sans.org/reading-room/whitepapers/logging/security-information-event-management-siem-35757"}
        ]
    },
    "VPN": {
        "definition": "Virtual Private Network",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/vpn"},
            {"name": "Official Site", "url": "https://www.cisco.com/c/en/us/products/security/vpn-endpoint-security-clients/what-is-vpn.html"}
        ]
    },
    "SSL": {
        "definition": "Secure Sockets Layer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ssl"},
            {"name": "Official Site", "url": "https://www.digicert.com/ssl"}
        ]
    },
    "TLS": {
        "definition": "Transport Layer Security",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tls"},
            {"name": "Official Site", "url": "https://www.digicert.com/ssl"}
        ]
    },
    "IPsec": {
        "definition": "Internet Protocol Security",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ipsec"},
            {"name": "Official Site", "url": "https://www.cisco.com/c/en/us/products/security/vpn-endpoint-security-clients/what-is-ipsec.html"}
        ]
    },
    "WEP": {
        "definition": "Wired Equivalent Privacy",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wep"},
            {"name": "Official Site", "url": "https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/wired-equivalent-privacy-wep-encryption"}
        ]
    },
    "WPA": {
        "definition": "Wi-Fi Protected Access",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wpa"},
            {"name": "Official Site", "url": "https://www.wi-fi.org/discover-wi-fi/security"}
        ]
    },
    "WPA2": {
        "definition": "Wi-Fi Protected Access II",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wpa2"},
            {"name": "Official Site", "url": "https://www.wi-fi.org/discover-wi-fi/security"}
        ]
    },
    "AES": {
        "definition": "Advanced Encryption Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/aes"},
            {"name": "Official Site", "url": "https://www.nist.gov/publications/advanced-encryption-standard-aes"}
        ]
    },
    "RSA": {
        "definition": "Rivest-Shamir-Adleman",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rsa"},
            {"name": "Official Site", "url": "https://www.rsa.com/en-us"}
        ]
    },
    "DES": {
        "definition": "Data Encryption Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/des"},
            {"name": "Official Site", "url": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.46-3.pdf"}
        ]
    },
    "3DES": {
        "definition": "Triple Data Encryption Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/3des"},
            {"name": "Official Site", "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-67r1.pdf"}
        ]
    },
    "SHA": {
        "definition": "Secure Hash Algorithm",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sha"},
            {"name": "Official Site", "url": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"}
        ]
    },
    "MD5": {
        "definition": "Message-Digest Algorithm 5",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/md5"},
            {"name": "Official Site", "url": "https://tools.ietf.org/html/rfc1321"}
        ]
    },
    "Wireshark": {
        "definition": "Network Protocol Analyzer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wireshark"},
            {"name": "Official Site", "url": "https://www.wireshark.org/"}
        ]
    },
    "Snort": {
        "definition": "Network Intrusion Detection System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/snort"},
            {"name": "Official Site", "url": "https://www.snort.org/"}
        ]
    },
    "Metasploit": {
        "definition": "Penetration Testing Framework",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/metasploit"},
            {"name": "Official Site", "url": "https://www.metasploit.com/"}
        ]
    },
    "Nmap": {
        "definition": "Network Mapper",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nmap"},
            {"name": "Official Site", "url": "https://nmap.org/"}
        ]
    },
    "Nessus": {
        "definition": "Vulnerability Scanner",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nessus"},
            {"name": "Official Site", "url": "https://www.tenable.com/products/nessus"}
        ]
    },
    "APT": {
        "definition": "Advanced Persistent Threat",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/apt"},
            {"name": "Official Site", "url": "https://www.fireeye.com/current-threats/apt-groups.html"}
        ]
    },
    "Malware": {
        "definition": "Malicious Software",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/malware"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/ncas/tips/ST04-016"}
        ]
    },
    "Ransomware": {
        "definition": "Ransom Malware",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ransomware"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/Ransomware"}
        ]
    },
    "Phishing": {
        "definition": "Fraudulent Attempt to Obtain Sensitive Information",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/phishing"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/ncas/tips/ST04-014"}
        ]
    },
    "SSO": {
        "definition": "Single Sign-On",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sso"},
            {"name": "Official Site", "url": "https://www.csoonline.com/article/3253497/what-is-single-sign-on-how-ss0-improves-security-and-the-user-experience.html"}
        ]
    },
    "LDAP": {
        "definition": "Lightweight Directory Access Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ldap"},
            {"name": "Official Site", "url": "https://ldap.com/"}
        ]
    },
    "CSIRT": {
        "definition": "Computer Security Incident Response Team",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/csirt"},
            {"name": "Official Site", "url": "https://www.us-cert.gov/"}
        ]
    },
    "ABAC": {
        "definition": "Attribute-Based Access Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/abac"}
        ]
    },
    "AICPA": {
        "definition": "American Institute of Certified Public Accountants",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/aicpa"}
        ]
    },
    "API": {
        "definition": "Application Programming Interface",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/api"}
        ]
    },
    "ARP": {
        "definition": "Address Resolution Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/arp"}
        ]
    },
    "BCP": {
        "definition": "Business Continuity Plan",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bcp"}
        ]
    },
    "BIA": {
        "definition": "Business Impact Analysis",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bia"}
        ]
    },
    "BLE": {
        "definition": "Bluetooth Low Energy",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ble"}
        ]
    },
    "BYOK": {
        "definition": "Bring Your Own Key",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/byok"}
        ]
    },
    "CAIQ": {
        "definition": "Consensus Assessments Initiative Questionnaire",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/caiq"}
        ]
    },
    "CASB": {
        "definition": "Cloud Access Security Broker",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/casb"}
        ]
    },
    "CIS": {
        "definition": "Center for Internet Security",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cis"}
        ]
    },
    "CKL": {
        "definition": "Checklist",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ckl"}
        ]
    },
    "CKMS": {
        "definition": "Cryptographic Key Management System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ckms"}
        ]
    },
    "CRL": {
        "definition": "Certificate Revocation List",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/crl"}
        ]
    },
    "CSC": {
        "definition": "Critical Security Controls",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/csc"}
        ]
    },
    "CSP": {
        "definition": "Cloud Service Provider",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/csp"}
        ]
    },
    "COSO": {
        "definition": "Committee of Sponsoring Organizations",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/coso"}
        ]
    },
    "DAST": {
        "definition": "Dynamic Application Security Testing",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dast"}
        ]
    },
    "DLP": {
        "definition": "Data Loss Prevention",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dlp"}
        ]
    },
    "DPIA": {
        "definition": "Data Protection Impact Assessment",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dpia"}
        ]
    },
    "DR": {
        "definition": "Disaster Recovery",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dr"}
        ]
    },
    "EMI": {
        "definition": "Electromagnetic Interference",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/emi"}
        ]
    },
    "ERM": {
        "definition": "Enterprise Risk Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/erm"}
        ]
    },
    "FEDRAMP": {
        "definition": "Federal Risk and Authorization Management Program",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fedramp"}
        ]
    },
    "FIM": {
        "definition": "File Integrity Monitoring",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fim"}
        ]
    },
    "HSM": {
        "definition": "Hardware Security Module",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/hsm"}
        ]
    },
    "IDaaS": {
        "definition": "Identity as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/idaas"}
        ]
    },
    "IDE": {
        "definition": "Integrated Development Environment",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ide"}
        ]
    },
    "IaaS": {
        "definition": "Infrastructure as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iaas"}
        ]
    },
    "IAST": {
        "definition": "Interactive Application Security Testing",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iast"}
        ]
    },
    "ICMP": {
        "definition": "Internet Control Message Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/icmp"}
        ]
    },
    "ISO": {
        "definition": "International Organization for Standardization",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iso"}
        ]
    },
    "IEC": {
        "definition": "International Electrotechnical Commission",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iec"}
        ]
    },
    "ITIL": {
        "definition": "Information Technology Infrastructure Library",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/itil"}
        ]
    },
    "KPI": {
        "definition": "Key Performance Indicator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/kpi"}
        ]
    },
    "KRI": {
        "definition": "Key Risk Indicator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/kri"}
        ]
    },
    "OS": {
        "definition": "Operating System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/os"}
        ]
    },
    "OWASP": {
        "definition": "Open Web Application Security Project",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/owasp"}
        ]
    },
    "PaaS": {
        "definition": "Platform as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/paas"}
        ]
    },
    "PAM": {
        "definition": "Privileged Access Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pam"}
        ]
    },
    "PII": {
        "definition": "Personally Identifiable Information",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pii"}
        ]
    },
    "PPTP": {
        "definition": "Point-to-Point Tunneling Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pptp"}
        ]
    },
    "RBAC": {
        "definition": "Role-Based Access Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rbac"}
        ]
    },
    "RBG": {
        "definition": "Random Bit Generator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rbg"}
        ]
    },
    "ROI": {
        "definition": "Return on Investment",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/roi"}
        ]
    },
    "RPO": {
        "definition": "Recovery Point Objective",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rpo"}
        ]
    },
    "RTO": {
        "definition": "Recovery Time Objective",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rto"}
        ]
    },
    "SaaS": {
        "definition": "Software as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/saas"}
        ]
    },
    "SAST": {
        "definition": "Static Application Security Testing",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sast"}
        ]
    },
    "SCA": {
        "definition": "Software Composition Analysis",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sca"}
        ]
    },
    "SDK": {
        "definition": "Software Development Kit",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sdk"}
        ]
    },
    "SDLC": {
        "definition": "Software Development Life Cycle",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sdlc"}
        ]
    },
    "SLA": {
        "definition": "Service-Level Agreement",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sla"}
        ]
    },
    "SLO": {
        "definition": "Service-Level Objective",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/slo"}
        ]
    },
    "SME": {
        "definition": "Subject Matter Expert",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sme"}
        ]
    },
    "SSDLC": {
        "definition": "Secure Software Development Life Cycle",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ssdlc"}
        ]
    },
    "SSH": {
        "definition": "Secure Shell",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ssh"}
        ]
    },
    "SSRM": {
        "definition": "Security, Stability, and Resiliency Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ssrm"}
        ]
    },
    "TPRM": {
        "definition": "Third-Party Risk Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tprm"}
        ]
    },
    "vTPM": {
        "definition": "Virtual Trusted Platform Module",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/vtpm"}
        ]
    },
    "VDP": {
        "definition": "Vulnerability Disclosure Program",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/vdp"}
        ]
    },
    "XaaS": {
        "definition": "Anything as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/xaas"}
        ]
    },
    "ASLR": {
        "definition": "Address Space Layout Randomization",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/aslr"}
        ]
    },
    "AV": {
        "definition": "Antivirus",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/av"}
        ]
    },
    "AWS": {
        "definition": "Amazon Web Services",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/aws"}
        ]
    },
    "BGP": {
        "definition": "Border Gateway Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bgp"}
        ]
    },
    "BSS": {
        "definition": "Basic Service Set",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bss"}
        ]
    },
    "C2": {
        "definition": "Command and Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/c2"}
        ]
    },
    "CA": {
        "definition": "Certificate Authority",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ca"}
        ]
    },
    "CAPTCHA": {
        "definition": "Completely Automated Public Turing test to tell Computers and Humans Apart",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/captcha"}
        ]
    },
    "CC": {
        "definition": "Common Criteria",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cc"}
        ]
    },
    "CORS": {
        "definition": "Cross-Origin Resource Sharing",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cors"}
        ]
    },
    "CTF": {
        "definition": "Capture The Flag",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ctf"}
        ]
    },
    "CVV": {
        "definition": "Card Verification Value",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cvv"}
        ]
    },
    "DGA": {
        "definition": "Domain Generation Algorithm",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dga"}
        ]
    },
    "DMZ": {
        "definition": "Demilitarized Zone",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dmz"}
        ]
    },
    "DNSSEC": {
        "definition": "Domain Name System Security Extensions",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dnssec"}
        ]
    },
    "EAP": {
        "definition": "Extensible Authentication Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/eap"}
        ]
    },
    "EDR": {
        "definition": "Endpoint Detection and Response",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/edr"}
        ]
    },
    "EFS": {
        "definition": "Encrypting File System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/efs"}
        ]
    },
    "FIDO": {
        "definition": "Fast Identity Online",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fido"}
        ]
    },
    "FIPS": {
        "definition": "Federal Information Processing Standards",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fips"}
        ]
    },
    "FTPS": {
        "definition": "File Transfer Protocol Secure",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ftps"}
        ]
    },
    "GPG": {
        "definition": "GNU Privacy Guard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/gpg"}
        ]
    },
    "HIDS": {
        "definition": "Host-based Intrusion Detection System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/hids"}
        ]
    },
    "IAP": {
        "definition": "Identity-Aware Proxy",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iap"}
        ]
    },
    "IMAP": {
        "definition": "Internet Message Access Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/imap"}
        ]
    },
    "IOC": {
        "definition": "Indicator of Compromise",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ioc"}
        ]
    },
    "IPFS": {
        "definition": "InterPlanetary File System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ipfs"}
        ]
    },
    "ISP": {
        "definition": "Internet Service Provider",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/isp"}
        ]
    },
    "ISSO": {
        "definition": "Information Systems Security Officer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/isso"}
        ]
    },
    "JSON": {
        "definition": "JavaScript Object Notation",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/json"}
        ]
    },
    "KMS": {
        "definition": "Key Management Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/kms"}
        ]
    },
    "LFI": {
        "definition": "Local File Inclusion",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/lfi"}
        ]
    },
    "LUKS": {
        "definition": "Linux Unified Key Setup",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/luks"}
        ]
    },
    "MAC": {
        "definition": "Mandatory Access Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mac"}
        ]
    },
    "MITM": {
        "definition": "Man-In-The-Middle",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mitm"}
        ]
    },
    "ML": {
        "definition": "Machine Learning",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ml"}
        ]
    },
    "MOTD": {
        "definition": "Message of the Day",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/motd"}
        ]
    },
    "MSSP": {
        "definition": "Managed Security Service Provider",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mssp"}
        ]
    },
    "MTTR": {
        "definition": "Mean Time To Recovery",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mttr"}
        ]
    },
    "NAC": {
        "definition": "Network Access Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nac"}
        ]
    },
    "NGFW": {
        "definition": "Next-Generation Firewall",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ngfw"}
        ]
    },
    "NIDS": {
        "definition": "Network Intrusion Detection System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nids"}
        ]
    },
    "OCSP": {
        "definition": "Online Certificate Status Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ocsp"}
        ]
    },
    "OTP": {
        "definition": "One-Time Password",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/otp"}
        ]
    },
    "PFS": {
        "definition": "Perfect Forward Secrecy",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pfs"}
        ]
    },
    "PSK": {
        "definition": "Pre-Shared Key",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/psk"}
        ]
    },
    "PTES": {
        "definition": "Penetration Testing Execution Standard",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ptes"}
        ]
    },
    "PTP": {
        "definition": "Precision Time Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ptp"}
        ]
    },
    "RA": {
        "definition": "Registration Authority",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ra"}
        ]
    },
    "RAID": {
        "definition": "Redundant Array of Independent Disks",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/raid"}
        ]
    },
    "RFC": {
        "definition": "Request for Comments",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rfc"}
        ]
    },
    "RFI": {
        "definition": "Remote File Inclusion",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rfi"}
        ]
    },
    "RNG": {
        "definition": "Random Number Generator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rng"}
        ]
    },
    "RPM": {
        "definition": "Revolutions Per Minute",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rpm"}
        ]
    },
    "SAML": {
        "definition": "Security Assertion Markup Language",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/saml"}
        ]
    },
    "SCAP": {
        "definition": "Security Content Automation Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/scap"}
        ]
    },
    "SIM": {
        "definition": "Subscriber Identity Module",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sim"}
        ]
    },
    "SMS": {
        "definition": "Short Message Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sms"}
        ]
    },
    "SMTP": {
        "definition": "Simple Mail Transfer Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/smtp"}
        ]
    },
    "SNMP": {
        "definition": "Simple Network Management Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/snmp"}
        ]
    },
    "SOAR": {
        "definition": "Security Orchestration, Automation, and Response",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/soar"}
        ]
    },
    "SPF": {
        "definition": "Sender Policy Framework",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/spf"}
        ]
    },
    "TACACS+": {
        "definition": "Terminal Access Controller Access-Control System Plus",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tacacsplus"}
        ]
    },
    "TPM": {
        "definition": "Trusted Platform Module",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tpm"}
        ]
    },
    "URL": {
        "definition": "Uniform Resource Locator",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/url"}
        ]
    },
    "USB": {
        "definition": "Universal Serial Bus",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/usb"}
        ]
    },
    "UTM": {
        "definition": "Unified Threat Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/utm"}
        ]
    },
    "UUID": {
        "definition": "Universally Unique Identifier",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/uuid"}
        ]
    },
    "WAF": {
        "definition": "Web Application Firewall",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/waf"}
        ]
    },
    "WAN": {
        "definition": "Wide Area Network",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wan"}
        ]
    },
    "WAP": {
        "definition": "Wireless Access Point",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wap"}
        ]
    },
    "WPA3": {
        "definition": "Wi-Fi Protected Access 3",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/wpa3"}
        ]
    },
    "XSS": {
        "definition": "Cross-Site Scripting",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/xss"}
        ]
    },
    "YARA": {
        "definition": "Yet Another Recursive Acronym",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/yara"}
        ]
    },
    "ACAS": {
        "definition": "Assured Compliance Assessment Solution",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/acas"}
        ]
    },
    "ACK": {
        "definition": "Acknowledgment",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ack"}
        ]
    },
    "AMSI": {
        "definition": "Antimalware Scan Interface",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/amsi"}
        ]
    },
    "BAC": {
        "definition": "Business Associate Contract",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bac"}
        ]
    },
    "BIOS": {
        "definition": "Basic Input/Output System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bios"}
        ]
    },
    "BPA": {
        "definition": "Business Partnership Agreement",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/bpa"}
        ]
    },
    "CaaS": {
        "definition": "Containers as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/caas"}
        ]
    },
    "CAP": {
        "definition": "Corrective Action Plan",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cap"}
        ]
    },
    "CBT": {
        "definition": "Computer-Based Training",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cbt"}
        ]
    },
    "CCMP": {
        "definition": "Counter Mode with Cipher Block Chaining Message Authentication Code Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ccmp"}
        ]
    },
    "CDM": {
        "definition": "Continuous Diagnostics and Mitigation",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cdm"}
        ]
    },
    "vCISO": {
        "definition": "Virtual Chief Information Security Officer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/vciso"},
            {"name": "Offical Site", "url": "https://richeymay.com/cybersecurity-services/vciso-services/"}
        ]
    },
    "CISO": {
        "definition": "Chief Information Security Officer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ciso"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ciso"}
        ]
    },
    "CNSSI": {
        "definition": "Committee on National Security Systems Instruction",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cnssi"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/cnssi"}
        ]
    },
    "COOP": {
        "definition": "Continuity of Operations Plan",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/coop"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/coop"}
        ]
    },
    "CTO": {
        "definition": "Chief Technology Officer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/cto"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/cto"}
        ]
    },
    "DAC": {
        "definition": "Discretionary Access Control",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dac"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dac"}
        ]
    },
    "DBIR": {
        "definition": "Data Breach Investigations Report",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dbir"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dbir"}
        ]
    },
    "DEP": {
        "definition": "Data Execution Prevention",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dep"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dep"}
        ]
    },
    "DHCP": {
        "definition": "Dynamic Host Configuration Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dhcp"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dhcp"}
        ]
    },
    "DNS": {
        "definition": "Domain Name System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dns"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dns"}
        ]
    },
    "DRP": {
        "definition": "Disaster Recovery Plan",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/drp"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/drp"}
        ]
    },
    "DSS": {
        "definition": "Decision Support System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/dss"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/dss"}
        ]
    },
    "ECC": {
        "definition": "Elliptic Curve Cryptography",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ecc"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ecc"}
        ]
    },
    "FDE": {
        "definition": "Full Disk Encryption",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/fde"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/fde"}
        ]
    },
    "FTP": {
        "definition": "File Transfer Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ftp"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ftp"}
        ]
    },
    "GRC": {
        "definition": "Governance, Risk, and Compliance",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/grc"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/grc"}
        ]
    },
    "IoT": {
        "definition": "Internet of Things",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/iot"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/iot"}
        ]
    },
    "IR": {
        "definition": "Incident Response",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ir"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ir"}
        ]
    },
    "ITGC": {
        "definition": "IT General Controls",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/itgc"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/itgc"}
        ]
    },
    "IVR": {
        "definition": "Interactive Voice Response",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ivr"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ivr"}
        ]
    },
    "MDM": {
        "definition": "Mobile Device Management",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/mdm"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/mdm"}
        ]
    },
    "NAS": {
        "definition": "Network-Attached Storage",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nas"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/nas"}
        ]
    },
    "NAT": {
        "definition": "Network Address Translation",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nat"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/nat"}
        ]
    },
    "NDA": {
        "definition": "Non-Disclosure Agreement",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nda"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/nda"}
        ]
    },
    "NIPS": {
        "definition": "Network Intrusion Prevention System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/nips"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/nips"}
        ]
    },
    "NOC": {
        "definition": "Network Operations Center",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/noc"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/noc"}
        ]
    },
    "NTFS": {
        "definition": "New Technology File System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ntfs"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ntfs"}
        ]
    },
    "OEM": {
        "definition": "Original Equipment Manufacturer",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/oem"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/oem"}
        ]
    },
    "OID": {
        "definition": "Object Identifier",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/oid"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/oid"}
        ]
    },
    "OVAL": {
        "definition": "Open Vulnerability and Assessment Language",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/oval"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/oval"}
        ]
    },
    "PBX": {
        "definition": "Private Branch Exchange",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pbx"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/pbx"}
        ]
    },
    "PKCS": {
        "definition": "Public Key Cryptography Standards",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/pkcs"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/pkcs"}
        ]
    },
    "QR": {
        "definition": "Quick Response",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/qr"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/qr"}
        ]
    },
    "RADIUS": {
        "definition": "Remote Authentication Dial-In User Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/radius"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/radius"}
        ]
    },
    "RDP": {
        "definition": "Remote Desktop Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rdp"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/rdp"}
        ]
    },
    "RFID": {
        "definition": "Radio Frequency Identification",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rfid"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/rfid"}
        ]
    },
    "RTOS": {
        "definition": "Real-Time Operating System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/rtos"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/rtos"}
        ]
    },
    "SAAS": {
        "definition": "Software as a Service",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/saas"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/saas"}
        ]
    },
    "SCADA": {
        "definition": "Supervisory Control and Data Acquisition",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/scada"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/scada"}
        ]
    },
    "SCEP": {
        "definition": "Simple Certificate Enrollment Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/scep"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/scep"}
        ]
    },
    "SDN": {
        "definition": "Software-Defined Networking",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/sdn"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/sdn"}
        ]
    },
    "SOA": {
        "definition": "Service-Oriented Architecture",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/soa"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/soa"}
        ]
    },
    "TACACS": {
        "definition": "Terminal Access Controller Access-Control System",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tacacs"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/tacacs"}
        ]
    },
    "TKIP": {
        "definition": "Temporal Key Integrity Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/tkip"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/tkip"}
        ]
    },
    "TOTP": {
        "definition": "Time-Based One-Time Password",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/totp"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/totp"}
        ]
    },
    "UPS": {
        "definition": "Uninterruptible Power Supply",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/ups"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/ups"}
        ]
    },
    "VLAN": {
        "definition": "Virtual Local Area Network",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/vlan"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/vlan"}
        ]
    },
    "VOIP": {
        "definition": "Voice over Internet Protocol",
        "sources": [
            {"name": "Definition", "url": "https://cybersecurityalphabetsoup.com/definitions/voip"},
            {"name": "Offical Site", "url": "https://cybersecurityalphabetsoup.com/definitions/voip"}
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let currentWord = '';
    let currentGuess = '';
    let attempts = 0;
    const maxAttempts = 6;
    const gameBoard = document.getElementById('game-board');
    const keyboard = document.getElementById('keyboard');
    const message = document.getElementById('message');

    fetch('acronyms.json')
        .then(response => response.json())
        .then(data => {
            const acronyms = data.acronyms;
            currentWord = acronyms[Math.floor(Math.random() * acronyms.length)];
            createBoard();
            createKeyboard();
        });

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < maxAttempts; i++) {
            for (let j = 0; j < currentWord.length; j++) {
                const tile = document.createElement('div');
                tile.setAttribute('id', `tile-${i}-${j}`);
                gameBoard.appendChild(tile);
            }
        }
    }

    function createKeyboard() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleKeyPress(letter));
            keyboard.appendChild(button);
        });

        const enterButton = document.createElement('button');
        enterButton.textContent = 'Enter';
        enterButton.addEventListener('click', submitGuess);
        keyboard.appendChild(enterButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteLetter);
        keyboard.appendChild(deleteButton);
    }

    function handleKeyPress(letter) {
        if (currentGuess.length < currentWord.length) {
            currentGuess += letter;
            document.getElementById(`tile-${attempts}-${currentGuess.length - 1}`).textContent = letter;
        }
    }

    function submitGuess() {
        if (currentGuess.length !== currentWord.length) {
            message.textContent = 'Incomplete guess!';
            return;
        }

        for (let i = 0; i < currentWord.length; i++) {
            const tile = document.getElementById(`tile-${attempts}-${i}`);
            if (currentGuess[i] === currentWord[i]) {
                tile.style.backgroundColor = 'green';
            } else if (currentWord.includes(currentGuess[i])) {
                tile.style.backgroundColor = 'yellow';
            } else {
                tile.style.backgroundColor = 'grey';
            }
        }

        if (currentGuess === currentWord) {
            message.textContent = 'You Win!';
            keyboard.querySelectorAll('button').forEach(button => button.disabled = true);
            return;
        }

        attempts++;
        currentGuess = '';

        if (attempts === maxAttempts) {
            message.textContent = `You Lose! The word was ${currentWord}`;
            keyboard.querySelectorAll('button').forEach(button => button.disabled = true);
        }
    }

    function deleteLetter() {
        if (currentGuess.length > 0) {
            const tile = document.getElementById(`tile-${attempts}-${currentGuess.length - 1}`);
            tile.textContent = '';
            currentGuess = currentGuess.slice(0, -1);
        }
    }
    // Function to get acronym definition and sources
function getAcronymDetails(acronym) {
    const details = acronyms[acronym];
    if (details) {
        console.log(`Definition of ${acronym}: ${details.definition}`);
        console.log(`Sources:`);
        details.sources.forEach(source => {
            console.log(`${source.name}: ${source.url}`);
        });
    } else {
        console.log(`Acronym ${acronym} not found.`);
    }
}
});
